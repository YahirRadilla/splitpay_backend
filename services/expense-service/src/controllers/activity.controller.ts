import type { Response } from "express";

import { getGroupActivities } from "../services/activity.service.js";

export const getActivities =
    async (
        req: any,
        res: Response
    ) => {
        try {
            const activities =
                await getGroupActivities(
                    req.params.groupId,
                    req.user.id
                );

            res.json(activities);
        } catch (error: any) {
            res.status(400).json({
                error: error.message,
            });
        }
    };