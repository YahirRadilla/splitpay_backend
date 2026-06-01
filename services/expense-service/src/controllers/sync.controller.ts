import type { Response } from "express";

import { getBootstrapData, getChanges } from "../services/sync.service.js";

export const bootstrap =
    async (
        req: any,
        res: Response
    ) => {
        const data =
            await getBootstrapData(
                req.user.id
            );

        res.json(data);
    };


export const changes =
    async (
        req: any,
        res: Response
    ) => {
        const since =
            new Date(
                req.query.since as string
            );

        const data =
            await getChanges(
                req.user.id,
                since
            );

        res.json(data);
    };