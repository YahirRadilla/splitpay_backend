import type { Request, Response } from "express";

import {
    createExpense,
    getGroupExpenses,
} from "../services/expense.service.js";

export const create = async (
    req: any,
    res: Response
) => {
    try {
        const expense = await createExpense(
            req.body.groupId,
            req.user.id,
            req.body.description,
            req.body.amount
        );

        res.status(201).json(expense);
    } catch (error: any) {
        res.status(400).json({
            error: error.message,
        });
    }
};

export const getAll = async (
    req: Request,
    res: Response
) => {
    try {
        const expenses =
            await getGroupExpenses(
                req.params.groupId as string
            );

        res.status(200).json(expenses);
    } catch (error: any) {
        res.status(400).json({
            error: error.message,
        });
    }
};