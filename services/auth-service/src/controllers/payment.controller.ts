import type {
    Response,
} from "express";

import {
    createSetupIntent,
    deletePaymentMethod,
    getPaymentMethods,
    createSettlementPayment,
} from "../services/payment.service.js";


import Stripe from "stripe";
import { stripe } from "../config/stripe.js";
import axios from "axios";

export const setupIntent =
    async (
        req: any,
        res: Response
    ) => {
        const result =
            await createSetupIntent(
                req.user!.id
            );

        res.json(result);
    };

export const paymentMethods =
    async (
        req: any,
        res: Response
    ) => {
        const methods =
            await getPaymentMethods(
                req.user!.id
            );

        res.json(methods);
    };

export const removePaymentMethod =
    async (
        req: any,
        res: Response
    ) => {
        const result =
            await deletePaymentMethod(
                req.user!.id,
                req.params
                    .paymentMethodId
            );

        res.json(result);
    };



export const webhook = async (
    req: any,
    res: any
) => {
    const signature =
        req.headers[
        "stripe-signature"
        ];

    let event: any;

    try {
        event =
            stripe.webhooks.constructEvent(
                req.body,
                signature,
                process.env
                    .STRIPE_WEBHOOK_SECRET || "http://expense-service:3003"
            );
        console.log(
            event.type
        )
    } catch (error) {
        return res
            .status(400)
            .send(
                "Webhook signature invalid"
            );
    }

    switch (event.type) {
        case "setup_intent.succeeded":
            console.log(
                "Card saved"
            );
            break;
        case "payment_intent.succeeded": {
            console.log(
                "Payment succeeded"
            )
            const paymentIntent =
                event.data.object;

            const {
                groupId,
                fromUserId,
                toUserId,
                amount,
                requestId,
            } =
                paymentIntent.metadata;

            await axios.post(
                `${process.env.EXPENSE_SERVICE_URL}/internal/settlements`,
                {
                    groupId,

                    fromUserId,

                    toUserId,

                    amount:
                        Number(amount),

                    requestId,
                }
            );

            break;
        }

        case "payment_intent.payment_failed":
            console.log(
                "Payment failed"
            );
            break;
    }

    res.json({
        received: true,
    });
};

export const settle =
    async (
        req: any,
        res: Response
    ) => {
        const {
            groupId,
            toUserId,
            amount,
            paymentMethodId,
            requestId,
        } = req.body;

        const result =
            await createSettlementPayment(
                req.user.id,
                groupId,
                toUserId,
                amount,
                paymentMethodId,
                requestId
            );

        res.json(result);
    };