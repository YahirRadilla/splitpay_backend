import { stripe } from "../config/stripe.js";

import { User } from "../models/user.model.js";


export const createStripeCustomer =
    async (
        userId: string,
        email: string
    ): Promise<any> => {
        const customer =
            await stripe.customers.create({
                email,
            });

        await User.findByIdAndUpdate(
            userId,
            {
                stripeCustomerId:
                    customer.id,
            }
        );

        return customer;
    };

export const attachPaymentMethod =
    async (
        userId: string,
        paymentMethodId: string
    ) => {
        const user =
            await User.findById(userId);

        if (!user) {
            throw new Error(
                "User not found"
            );
        }

        if (!user.stripeCustomerId) {
            throw new Error(
                "Stripe customer not found"
            );
        }

        await stripe.paymentMethods.attach(
            paymentMethodId,
            {
                customer:
                    user.stripeCustomerId,
            }
        );

        await stripe.customers.update(
            user.stripeCustomerId,
            {
                invoice_settings: {
                    default_payment_method:
                        paymentMethodId,
                },
            }
        );

        user.defaultPaymentMethodId =
            paymentMethodId;

        await user.save();

        return {
            success: true,
        };
    };