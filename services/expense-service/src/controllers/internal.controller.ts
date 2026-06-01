import type { Request, Response }
    from "express";

import {
    createSettlement,
} from "../services/settlement.service.js";

export const createSettlementInternal =
    async (
        req: Request,
        res: Response
    ) => {
        const {
            groupId,
            fromUserId,
            toUserId,
            amount,
            requestId,
        } = req.body;

        const settlement =
            await createSettlement(
                groupId,
                fromUserId,
                toUserId,
                amount,
                requestId
            );

        res.json(settlement);
    };