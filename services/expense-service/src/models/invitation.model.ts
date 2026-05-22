import mongoose from "mongoose";

const invitationSchema =
    new mongoose.Schema(
        {
            groupId: {
                type: String,
                required: true,
            },

            invitedBy: {
                type: String,
                required: true,
            },

            invitedUserId: {
                type: String,
                required: true,
            },

            status: {
                type: String,

                enum: [
                    "pending",
                    "accepted",
                    "rejected",
                    "expired",
                ],

                default: "pending",
            },

            expiresAt: {
                type: Date,

                required: true,
            },
        },
        {
            timestamps: true,
        }
    );

export const Invitation =
    mongoose.model(
        "Invitation",
        invitationSchema
    );