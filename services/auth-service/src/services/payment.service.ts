import Stripe from "stripe";

import { User } from "../models/user.model.js";

import { stripe } from "../config/stripe.js";

export const createSetupIntent = async (
    userId: string
) => {
    const user =
        await User.findById(userId);

    if (
        !user ||
        !user.stripeCustomerId
    ) {
        throw new Error(
            "Stripe customer not found"
        );
    }

    const setupIntent =
        await stripe.setupIntents.create({
            customer:
                user.stripeCustomerId,

            payment_method_types: [
                "card",
            ],
        });

    return {
        clientSecret:
            setupIntent.client_secret,
    };
};

export const getPaymentMethods =
    async (userId: string) => {
        const user =
            await User.findById(userId);

        if (
            !user ||
            !user.stripeCustomerId
        ) {
            throw new Error(
                "Stripe customer not found"
            );
        }

        const methods =
            await stripe.paymentMethods.list({
                customer:
                    user.stripeCustomerId,

                type: "card",

            });

        return methods.data.map(
            (method) => ({
                id: method.id,

                brand:
                    method.card?.brand,

                last4:
                    method.card?.last4,

                expMonth:
                    method.card
                        ?.exp_month,

                expYear:
                    method.card
                        ?.exp_year,
            })
        );
    };

export const deletePaymentMethod =
    async (
        userId: string,
        paymentMethodId: string
    ) => {
        const user =
            await User.findById(userId);

        if (
            !user ||
            !user.stripeCustomerId
        ) {
            throw new Error(
                "Stripe customer not found"
            );
        }

        await stripe.paymentMethods.detach(
            paymentMethodId
        );

        return {
            success: true,
        };
    };


export const createSettlementPayment =
    async (
        payerId: string,
        groupId: string,
        toUserId: string,
        amount: number,
        paymentMethodId: string,
        requestId: string
    ) => {
        const payer =
            await User.findById(
                payerId
            );

        if (
            !payer ||
            !payer.stripeCustomerId
        ) {
            throw new Error(
                "Payer not found"
            );
        }

        const receiver =
            await User.findById(
                toUserId
            );

        if (
            !receiver ||
            !receiver.stripeConnectedAccountId
        ) {
            throw new Error(
                "Receiver not ready"
            );
        }

        const account =
            await stripe.accounts.retrieve(
                receiver
                    .stripeConnectedAccountId
            );

        if (
            !account.charges_enabled ||
            !account.payouts_enabled
        ) {
            throw new Error(
                "Receiver onboarding incomplete"
            );
        }

        return stripe.paymentIntents.create({
            amount:
                Math.round(
                    amount * 100
                ),

            currency: "usd",

            customer:
                payer.stripeCustomerId,

            payment_method:
                paymentMethodId,

            payment_method_types: [
                "card",
            ],

            confirm: true,

            transfer_data: {
                destination:
                    receiver
                        .stripeConnectedAccountId,
            },

            metadata: {
                groupId,

                fromUserId:
                    payerId,

                toUserId,

                amount:
                    amount.toString(),

                requestId,
            },
        });
    };