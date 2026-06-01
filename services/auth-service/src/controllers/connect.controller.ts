import {
    createConnectedAccount,
    createOnboardingLink,
    getConnectStatus,
} from "../services/connect.service.js";

export const createAccount =
    async (
        req: any,
        res: any
    ) => {
        const result =
            await createConnectedAccount(
                req.user.id
            );

        res.json(result);
    };

export const onboarding =
    async (
        req: any,
        res: any
    ) => {
        const result =
            await createOnboardingLink(
                req.user.id
            );

        res.json(result);
    };

export const status =
    async (
        req: any,
        res: any
    ) => {
        const result =
            await getConnectStatus(
                req.user.id
            );

        res.json(result);
    };