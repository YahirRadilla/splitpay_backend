import type { Request, Response } from "express";

import { calculateSettlements } from "../services/settlement.service.js";

export const getSettlements = async (
    req: any,
    res: Response
) => {
    try {
        const settlements =
            await calculateSettlements(
                req.params.groupId,
                req.user.id
            );

        res.status(200).json(settlements);
    } catch (error: any) {
        res.status(400).json({
            error: error.message,
        });
    }
};