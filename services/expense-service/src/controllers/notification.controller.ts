import type { Response } from "express";

import {
    getMyNotifications,
    markAsRead,
} from "../services/notification.service.js";

export const mine =
    async (
        req: any,
        res: Response
    ) => {
        try {
            const notifications =
                await getMyNotifications(
                    req.user.id
                );

            res.json(
                notifications
            );
        } catch (error: any) {
            res.status(400).json({
                error:
                    error.message,
            });
        }
    };

export const read =
    async (
        req: any,
        res: Response
    ) => {
        try {
            const notification =
                await markAsRead(
                    req.params.id,
                    req.user.id
                );

            res.json(
                notification
            );
        } catch (error: any) {
            res.status(400).json({
                error:
                    error.message,
            });
        }
    };