import { Activity } from "../models/activity.model.js";

import { validateGroupAccess } from "../utils/group-access.js";

export const createActivity =
    async (
        groupId: string,
        userId: string,
        type: string,
        message: string,
        metadata: any = {}
    ) => {
        return Activity.create({
            groupId,
            userId,
            type,
            message,
            metadata,
        });
    };

export const getGroupActivities =
    async (
        groupId: string,
        userId: string
    ) => {
        await validateGroupAccess(
            groupId,
            userId
        );

        return Activity.find({
            groupId,
        }).sort({
            createdAt: -1,
        });
    };