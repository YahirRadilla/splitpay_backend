import type { Request, Response } from "express";

import {
    calculateSettlements,
    createSettlement,
    getSettlementHistory,
} from "../services/settlement.service.js";

export const create = async (
    req: any,
    res: Response
) => {
    try {
        const settlement =
            await createSettlement(
                req.body.groupId,
                req.user.id,
                req.body.toUserId,
                req.body.amount
            );

        res.status(201).json(settlement);
    } catch (error: any) {
        res.status(400).json({
            error: error.message,
        });
    }
};

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

export const history = async (
    req: any,
    res: Response
) => {
    try {
        const settlements =
            await getSettlementHistory(
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