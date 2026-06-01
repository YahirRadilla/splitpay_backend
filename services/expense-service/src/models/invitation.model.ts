import mongoose from "mongoose";

const invitationSchema =
    new mongoose.Schema(
        {
            requestId: {
                type: String,
                required: true,
                unique: true,
            },
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
            deletedAt: {
                type: Date,
                default: null,
            }
        },
        {
            timestamps: true,
        }
    );

invitationSchema.index({
    invitedUserId: 1,
    updatedAt: 1,
});

export const Invitation =
    mongoose.model(
        "Invitation",
        invitationSchema
    );