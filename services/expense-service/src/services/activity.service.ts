import { Activity } from "../models/activity.model.js";

import { validateGroupAccess } from "../utils/group-access.js";
import { emitRealtimeEvent } from "./realtime.service.js";

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
        }).then(async (activity) => {
            await emitRealtimeEvent(
                "/events/activity-created",
                {
                    groupId,

                    payload:
                        activity,
                }
            );
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