import { calculateBalances } from "./balance.service.js";

import { validateGroupAccess } from "../utils/group-access.js";

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