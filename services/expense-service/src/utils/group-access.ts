import mongoose from "mongoose";

import { Group } from "../models/group.model.js";

export const validateGroupAccess = async (
    groupId: string,
    userId: string
) => {
    if (
        !mongoose.Types.ObjectId.isValid(groupId)
    ) {
        throw new Error("Invalid group id");
    }

    const group = await Group.findById(groupId);

    if (!group) {
        throw new Error("Group not found");
    }

    if (!group.members.includes(userId)) {
        throw new Error("Forbidden");
    }

    return group;
};