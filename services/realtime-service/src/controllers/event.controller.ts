import type { Request, Response } from "express";

import {
    emitActivityCreated,
    emitBalanceUpdated,
    emitExpenseCreated,
    emitInvitationAccepted,
    emitInvitationRejected,
    emitMemberInvited,
    emitMemberJoined,
    emitNotificationCreated,
    emitSettlementCreated,
} from "../events/emitters.js";

export const expenseCreated =
    (
        req: Request,
        res: Response
    ) => {
        emitExpenseCreated(
            req.body.groupId,
            req.body.payload
        );

        res.json({
            success: true,
        });
    };

export const settlementCreated =
    (
        req: Request,
        res: Response
    ) => {
        emitSettlementCreated(
            req.body.groupId,
            req.body.payload
        );

        res.json({
            success: true,
        });
    };

export const balanceUpdated =
    (
        req: Request,
        res: Response
    ) => {
        emitBalanceUpdated(
            req.body.groupId,
            req.body.payload
        );

        res.json({
            success: true,
        });
    };

export const memberInvited =
    (
        req: Request,
        res: Response
    ) => {
        emitMemberInvited(
            req.body.userId,
            req.body.payload
        );

        res.json({
            success: true,
        });
    };

export const invitationAccepted =
    (
        req: Request,
        res: Response
    ) => {
        emitInvitationAccepted(
            req.body.groupId,
            req.body.payload
        );

        res.json({
            success: true,
        });
    };

export const invitationRejected =
    (
        req: Request,
        res: Response
    ) => {
        emitInvitationRejected(
            req.body.groupId,
            req.body.payload
        );

        res.json({
            success: true,
        });
    };

export const memberJoined =
    (
        req: Request,
        res: Response
    ) => {
        emitMemberJoined(
            req.body.groupId,
            req.body.payload
        );

        res.json({
            success: true,
        });
    };

export const activityCreated =
    (
        req: Request,
        res: Response
    ) => {
        emitActivityCreated(
            req.body.groupId,
            req.body.payload
        );

        res.json({
            success: true,
        });
    };

export const notificationCreated =
    (
        req: Request,
        res: Response
    ) => {
        emitNotificationCreated(
            req.body.userId,
            req.body.payload
        );

        res.json({
            success: true,
        });
    };