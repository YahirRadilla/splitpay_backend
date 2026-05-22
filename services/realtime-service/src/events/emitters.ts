import { Server } from "socket.io";

import { EVENTS } from "./events.js";

let io: Server;

export const setSocketServer =
    (server: Server) => {
        io = server;
    };

export const emitGroupCreated =
    (
        userId: string,
        payload: any
    ) => {
        io.to(userId).emit(
            EVENTS.GROUP_CREATED,
            payload
        );
    };

export const emitMemberJoined =
    (
        groupId: string,
        payload: any
    ) => {
        io.to(groupId).emit(
            EVENTS.MEMBER_JOINED,
            payload
        );
    };

export const emitMemberInvited =
    (
        userId: string,
        payload: any
    ) => {
        io.to(userId).emit(
            EVENTS.MEMBER_INVITED,
            payload
        );
    };

export const emitInvitationAccepted =
    (
        groupId: string,
        payload: any
    ) => {
        io.to(groupId).emit(
            EVENTS.INVITATION_ACCEPTED,
            payload
        );
    };

export const emitInvitationRejected =
    (
        groupId: string,
        payload: any
    ) => {
        io.to(groupId).emit(
            EVENTS.INVITATION_REJECTED,
            payload
        );
    };

export const emitExpenseCreated =
    (
        groupId: string,
        payload: any
    ) => {
        io.to(groupId).emit(
            EVENTS.EXPENSE_CREATED,
            payload
        );
    };

export const emitExpenseUpdated =
    (
        groupId: string,
        payload: any
    ) => {
        io.to(groupId).emit(
            EVENTS.EXPENSE_UPDATED,
            payload
        );
    };

export const emitExpenseDeleted =
    (
        groupId: string,
        payload: any
    ) => {
        io.to(groupId).emit(
            EVENTS.EXPENSE_DELETED,
            payload
        );
    };

export const emitBalanceUpdated =
    (
        groupId: string,
        payload: any
    ) => {
        io.to(groupId).emit(
            EVENTS.BALANCE_UPDATED,
            payload
        );
    };

export const emitSettlementCreated =
    (
        groupId: string,
        payload: any
    ) => {
        io.to(groupId).emit(
            EVENTS.SETTLEMENT_CREATED,
            payload
        );
    };

export const emitActivityCreated =
    (
        groupId: string,
        payload: any
    ) => {
        io.to(groupId).emit(
            EVENTS.ACTIVITY_CREATED,
            payload
        );
    };

export const emitNotificationCreated =
    (
        userId: string,
        payload: any
    ) => {
        io.to(userId).emit(
            EVENTS.NOTIFICATION_CREATED,
            payload
        );
    };