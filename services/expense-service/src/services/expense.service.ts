import { Expense } from "../models/expense.model.js";
import { Group } from "../models/group.model.js";
import { createActivity } from "./activity.service.js";
import { calculateBalances } from "./balance.service.js";
import { createNotification } from "./notification.service.js";
import { emitRealtimeEvent } from "./realtime.service.js";

export const createExpense = async (
    groupId: string,
    paidBy: string,
    description: string,
    amount: number,
    requestId: string
) => {
    if (requestId) {
        const existingExpense =
            await Expense.findOne({
                requestId,
            });

        if (existingExpense) {
            return existingExpense;
        }
    }
    console.log(requestId);
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
        requestId,
        splits,
    });

    await Promise.all(
        group.members
            .filter(
                (memberId) =>
                    memberId !== paidBy
            )
            .map((memberId) =>
                createNotification(
                    memberId,

                    "expense_created",

                    "New expense",

                    `${description} was added`,

                    {
                        groupId,
                        amount,
                    }
                )
            )
    );

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

    const balances =
        await calculateBalances(
            groupId,
            paidBy
        );

    await emitRealtimeEvent(
        "/events/expense-created",
        {
            groupId,

            payload: expense,
        }
    );

    await emitRealtimeEvent(
        "/events/balance-updated",
        {
            groupId,

            payload: balances,
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