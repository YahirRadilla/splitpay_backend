import { Invitation } from "../models/invitation.model.js";

import { Group } from "../models/group.model.js";
import { createActivity } from "./activity.service.js";
import { createNotification } from "./notification.service.js";


export const createInvitation =
    async (
        groupId: string,
        invitedBy: string,
        invitedUserId: string
    ) => {
        const group =
            await Group.findById(
                groupId
            );

        if (!group) {
            throw new Error(
                "Group not found"
            );
        }

        if (
            group.ownerId !== invitedBy
        ) {
            throw new Error(
                "Only owner can invite"
            );
        }

        if (
            group.members.includes(
                invitedUserId
            )
        ) {
            throw new Error(
                "User already in group"
            );
        }

        const existingInvitation =
            await Invitation.findOne({
                groupId,

                invitedUserId,

                status: "pending",
            });

        if (existingInvitation) {
            throw new Error(
                "Invitation already exists"
            );
        }

        return Invitation.create({
            groupId,

            invitedBy,

            invitedUserId,

            expiresAt:
                new Date(
                    Date.now() +
                    1000 *
                    60 *
                    60 *
                    24 *
                    7
                ),
        }).then(async () => {
            await createNotification(
                invitedUserId,

                "invitation_received",

                "New invitation",

                "You were invited to a group",

                {
                    groupId,
                }
            );
            await createActivity(
                groupId,
                invitedBy,
                "invitation_sent",
                "Invitation sent",
                {
                    invitedUserId,
                }
            );
        });
    };

export const acceptInvitation =
    async (
        invitationId: string,
        userId: string
    ) => {
        const invitation =
            await Invitation.findById(
                invitationId
            );

        if (!invitation) {
            throw new Error(
                "Invitation not found"
            );
        }

        if (
            invitation.invitedUserId !==
            userId
        ) {
            throw new Error(
                "Unauthorized"
            );
        }

        if (
            invitation.status !==
            "pending"
        ) {
            throw new Error(
                "Invitation already handled"
            );
        }

        if (
            invitation.expiresAt <
            new Date()
        ) {
            invitation.status =
                "expired";

            await invitation.save();

            throw new Error(
                "Invitation expired"
            );
        }

        const group =
            await Group.findById(
                invitation.groupId
            );

        if (!group) {
            throw new Error(
                "Group not found"
            );
        }

        if (
            !group.members.includes(
                userId
            )
        ) {
            group.members.push(
                userId
            );

            await group.save();
        }

        invitation.status =
            "accepted";

        await invitation.save();

        await createActivity(
            invitation.groupId,
            userId,
            "member_joined",
            "Joined group",
            {}
        );

        return invitation;
    };

export const rejectInvitation =
    async (
        invitationId: string,
        userId: string
    ) => {
        const invitation =
            await Invitation.findById(
                invitationId
            );

        if (!invitation) {
            throw new Error(
                "Invitation not found"
            );
        }

        if (
            invitation.invitedUserId !==
            userId
        ) {
            throw new Error(
                "Unauthorized"
            );
        }

        invitation.status =
            "rejected";

        await invitation.save();

        await createActivity(
            invitation.groupId,
            userId,
            "member_rejected",
            "Rejected invitation",
            {}
        );

        return invitation;
    };

export const getMyInvitations =
    async (userId: string) => {
        return Invitation.find({
            invitedUserId: userId,

            status: "pending",
        });
    };