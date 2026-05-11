import { Group } from "../models/group.model.js";

export const createGroup = async (
    name: string,
    ownerId: string
) => {
    const group = await Group.create({
        name,
        ownerId,
        members: [ownerId],
    });

    return group;
};

export const getGroups = async (
    userId: string
) => {
    return Group.find({
        members: userId,
    });
};

export const addMember = async (
    groupId: string,
    userId: string
) => {
    const group = await Group.findById(groupId);

    if (!group) {
        throw new Error("Group not found");
    }

    if (!group.members.includes(userId)) {
        group.members.push(userId);
    }

    await group.save();

    return group;
};