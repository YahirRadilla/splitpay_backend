import { Expense } from "../models/expense.model.js";
import { Group } from "../models/group.model.js";
import { createActivity } from "./activity.service.js";

export const createExpense = async (
    groupId: string,
    paidBy: string,
    description: string,
    amount: number
) => {
    const group = await Group.findById(groupId);

    if (!group) {
        throw new Error("Group not found");
    }

    if (!group.members.includes(paidBy)) {
        throw new Error("Not a member");
    }

    const splitAmount =
        amount / group.members.length;

    const splits = group.members.map(
        (memberId) => ({
            userId: memberId,
            amount: splitAmount,
        })
    );

    const expense = await Expense.create({
        groupId,
        paidBy,
        description,
        amount,
        splits,
    });

    await createActivity(
        groupId,
        paidBy,
        "expense_created",
        `${description} created`,
        {
            expenseId: expense.id,
            amount,
        }
    );

    return expense;
};

export const getGroupExpenses = async (
    groupId: string
) => {
    return Expense.find({
        groupId,
    });
};