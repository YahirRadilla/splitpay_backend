import type { Response } from "express";

import { attachPaymentMethod } from "../services/billing.service.js";

export const addPaymentMethod =
    async (
        req: any,
        res: Response
    ) => {
        const result =
            await attachPaymentMethod(
                req.user.id,
                req.body.paymentMethodId
            );

        res.json(result);
    };