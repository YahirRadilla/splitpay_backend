import mongoose from "mongoose";

import { Settlement } from "../models/settlement.model.js";

import { calculateBalances } from "./balance.service.js";

import { validateGroupAccess } from "../utils/group-access.js";

export const createSettlement = async (
    groupId: string,
    fromUserId: string,
    toUserId: string,
    amount: number
) => {
    const session =
        await mongoose.startSession();

    try {
        session.startTransaction();

        if (
            !mongoose.Types.ObjectId.isValid(
                toUserId
            )
        ) {
            throw new Error(
                "Invalid user id"
            );
        }

        if (amount <= 0) {
            throw new Error(
                "Invalid amount"
            );
        }

        const group =
            await validateGroupAccess(
                groupId,
                fromUserId
            );

        if (
            !group.members.includes(
                toUserId
            )
        ) {
            throw new Error(
                "Receiver not in group"
            );
        }

        const balances =
            await calculateBalances(
                groupId,
                fromUserId,
                session
            );

        const currentDebt =
            Math.abs(
                balances[
                fromUserId
                ] || 0
            );

        if (amount > currentDebt) {
            throw new Error(
                "Settlement exceeds debt"
            );
        }

        const settlement =
            new Settlement({
                groupId,
                fromUserId,
                toUserId,
                amount,
            });

        await settlement.save({
            session,
        });

        await session.commitTransaction();

        return settlement;
    } catch (error) {
        await session.abortTransaction();

        throw error;
    } finally {
        session.endSession();
    }
};

export const calculateSettlements = async (
    groupId: string,
    userId: string
) => {
    await validateGroupAccess(
        groupId,
        userId
    );

    const balances =
        await calculateBalances(
            groupId,
            userId
        );

    const creditors: any[] = [];
    const debtors: any[] = [];

    for (const userId in balances) {
        const amount = balances[userId];

        if (amount! > 0) {
            creditors.push({
                userId,
                amount,
            });
        }

        if (amount! < 0) {
            debtors.push({
                userId,
                amount: Math.abs(amount!),
            });
        }
    }

    const settlements = [];

    let i = 0;
    let j = 0;

    while (
        i < debtors.length &&
        j < creditors.length
    ) {
        const debtor = debtors[i];
        const creditor = creditors[j];

        const settledAmount = Math.min(
            debtor.amount,
            creditor.amount
        );

        settlements.push({
            from: debtor.userId,
            to: creditor.userId,
            amount: settledAmount,
        });

        debtor.amount -= settledAmount;
        creditor.amount -= settledAmount;

        if (debtor.amount === 0) {
            i++;
        }

        if (creditor.amount === 0) {
            j++;
        }
    }

    return settlements;
};

export const getSettlementHistory =
    async (groupId: string, userId: string) => {
        await validateGroupAccess(
            groupId,
            userId
        );

        return Settlement.find({
            groupId,
        }).sort({
            createdAt: -1,
        });
    };