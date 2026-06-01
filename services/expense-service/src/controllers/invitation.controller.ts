import type { Request, Response } from "express";

import {
    acceptInvitation,
    createInvitation,
    getMyInvitations,
    rejectInvitation,
} from "../services/invitation.service.js";

export const create =
    async (
        req: any,
        res: Response
    ) => {
        try {
            const invitation =
                await createInvitation(
                    req.params.groupId,

                    req.user.id,

                    req.body.invitedUserId,

                    req.body.requestId
                );

            res.status(201).json(
                invitation
            );
        } catch (error: any) {
            res.status(400).json({
                error: error.message,
            });
        }
    };

export const accept =
    async (
        req: any,
        res: Response
    ) => {
        try {
            const invitation =
                await acceptInvitation(
                    req.params.id,

                    req.user.id
                );

            res.json(invitation);
        } catch (error: any) {
            res.status(400).json({
                error: error.message,
            });
        }
    };

export const reject =
    async (
        req: any,
        res: Response
    ) => {
        try {
            const invitation =
                await rejectInvitation(
                    req.params.id,

                    req.user.id
                );

            res.json(invitation);
        } catch (error: any) {
            res.status(400).json({
                error: error.message,
            });
        }
    };

export const mine =
    async (
        req: any,
        res: Response
    ) => {
        try {
            const invitations =
                await getMyInvitations(
                    req.user.id
                );

            res.json(invitations);
        } catch (error: any) {
            res.status(400).json({
                error: error.message,
            });
        }
    };