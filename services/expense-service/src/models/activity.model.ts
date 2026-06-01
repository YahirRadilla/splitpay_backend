import mongoose from "mongoose";

const activitySchema =
    new mongoose.Schema(
        {
            groupId: {
                type: String,
                required: true,
            },

            userId: {
                type: String,
                required: true,
            },

            type: {
                type: String,
                required: true,
            },

            message: {
                type: String,
                required: true,
            },

            metadata: {
                type: Object,
                default: {},
            },
            deletedAt: {
                type: Date,
                default: null,
            }
        },
        {
            timestamps: true,
        },

    );

activitySchema.index({
    groupId: 1,
    updatedAt: 1,
});

export const Activity =
    mongoose.model(
        "Activity",
        activitySchema
    );