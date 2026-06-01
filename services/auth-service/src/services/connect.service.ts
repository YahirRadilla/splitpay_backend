import { User } from "../models/user.model.js";
import { stripe } from "../config/stripe.js";

export const createConnectedAccount =
    async (userId: string) => {
        const user =
            await User.findById(userId);

        if (!user) {
            throw new Error(
                "User not found"
            );
        }

        if (
            user.stripeConnectedAccountId
        ) {
            return {
                accountId:
                    user.stripeConnectedAccountId,
            };
        }

        const account =
            await stripe.accounts.create({
                type: "express",
            });

        user.stripeConnectedAccountId =
            account.id;

        await user.save();

        return {
            accountId:
                account.id,
        };
    };


export const createOnboardingLink =
    async (userId: string) => {
        const user =
            await User.findById(userId);

        if (
            !user ||
            !user.stripeConnectedAccountId
        ) {
            throw new Error(
                "Connected account not found"
            );
        }

        const accountLink =
            await stripe.accountLinks.create({
                account:
                    user.stripeConnectedAccountId,

                refresh_url:
                    "http://localhost:5173/connect/refresh",

                return_url:
                    "http://localhost:5173/connect/success",

                type:
                    "account_onboarding",
            });

        return {
            url: accountLink.url,
        };
    };



export const getConnectStatus =
    async (userId: string) => {
        const user =
            await User.findById(userId);

        if (
            !user ||
            !user.stripeConnectedAccountId
        ) {
            throw new Error(
                "Connected account not found"
            );
        }

        const account =
            await stripe.accounts.retrieve(
                user.stripeConnectedAccountId
            );

        return {
            chargesEnabled:
                account.charges_enabled,

            payoutsEnabled:
                account.payouts_enabled,
        };
    };