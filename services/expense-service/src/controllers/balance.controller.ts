import type { Request, Response } from "express";

import { calculateBalances } from "../services/balance.service.js";

export const getBalances = async (
    req: Request,
    res: Response
) => {
    try {
        const balances =
            await calculateBalances(
                req.params.groupId as string
            );

        res.status(200).json(balances);
    } catch (error: any) {
        res.status(400).json({
            error: error.message,
        });
    }
};