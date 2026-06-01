import { Group } from "../models/group.model.js";
import { Expense } from "../models/expense.model.js";
import { Settlement } from "../models/settlement.model.js";
import { Activity } from "../models/activity.model.js";
import { Notification } from "../models/notification.model.js";
import { Invitation } from "../models/invitation.model.js";

export const getBootstrapData =
    async (userId: string) => {

        const groups =
            await Group.find({
                members: userId,
            });

        const groupIds =
            groups.map(
                (group) =>
                    group.id
            );

        const [
            expenses,
            settlements,
            activities,
            notifications,
            invitations,
        ] = await Promise.all([
            Expense.find({
                groupId: {
                    $in: groupIds,
                },
            }),

            Settlement.find({
                groupId: {
                    $in: groupIds,
                },
            }),

            Activity.find({
                groupId: {
                    $in: groupIds,
                },
            }),

            Notification.find({
                userId,
            }),

            Invitation.find({
                invitedUserId:
                    userId,
            }),
        ]);

        return {
            groups,

            expenses,

            settlements,

            activities,

            notifications,

            invitations,

            serverTime:
                new Date()
                    .toISOString(),
        };
    };


export const getChanges = async (
    userId: string,
    since: Date
) => {

    const changedGroups =
        await Group.find({
            members: userId,

            updatedAt: {
                $gt: since,
            },
        });


    const allGroups =
        await Group.find({
            members: userId,
        });

    const groupIds =
        allGroups.map(
            (group) => group.id
        );

    const [
        expenses,
        settlements,
        activities,
        notifications,
        invitations,
    ] = await Promise.all([
        Expense.find({
            groupId: {
                $in: groupIds,
            },

            updatedAt: {
                $gt: since,
            },
        }),

        Settlement.find({
            groupId: {
                $in: groupIds,
            },

            updatedAt: {
                $gt: since,
            },
        }),

        Activity.find({
            groupId: {
                $in: groupIds,
            },

            updatedAt: {
                $gt: since,
            },
        }),

        Notification.find({
            userId,

            updatedAt: {
                $gt: since,
            },
        }),

        Invitation.find({
            invitedUserId: userId,

            updatedAt: {
                $gt: since,
            },
        }),
    ]);

    return {
        groups: changedGroups,

        expenses,

        settlements,

        activities,

        notifications,

        invitations,

        serverTime:
            new Date().toISOString(),
    };
};