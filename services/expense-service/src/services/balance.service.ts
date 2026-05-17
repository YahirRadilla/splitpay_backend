import { Expense } from "../models/expense.model.js";

import { Settlement } from "../models/settlement.model.js";

import { validateGroupAccess } from "../utils/group-access.js";

export const calculateBalances = async (
    groupId: string,
    userId: string
) => {
    await validateGroupAccess(
        groupId,
        userId
    );

    const expenses = await Expense.find({
        groupId,
    });

    const settlements =
        await Settlement.find({
            groupId,
        });

    const balances: Record<string, number> = {};

    for (const expense of expenses) {
        const paidBy = expense.paidBy;

        if (!balances[paidBy]) {
            balances[paidBy] = 0;
        }

        balances[paidBy] += expense.amount;

        for (const split of expense.splits) {
            if (!balances[split.userId]) {
                balances[split.userId] = 0;
            }

            balances[split.userId]! -= split.amount;
        }
    }

    for (const settlement of settlements) {
        if (
            !balances[settlement.fromUserId]
        ) {
            balances[settlement.fromUserId] = 0;
        }

        if (
            !balances[settlement.toUserId]
        ) {
            balances[settlement.toUserId] = 0;
        }

        balances[
            settlement.fromUserId
        ]! += settlement.amount;

        balances[
            settlement.toUserId
        ]! -= settlement.amount;
    }

    return balances;
};