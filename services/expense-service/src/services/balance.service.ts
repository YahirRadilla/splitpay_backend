import { Expense } from "../models/expense.model.js";

export const calculateBalances = async (
    groupId: string
) => {
    const expenses = await Expense.find({
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

    return balances;
};