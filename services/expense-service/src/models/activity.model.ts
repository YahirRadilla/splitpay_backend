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
        },
        {
            timestamps: true,
        }
    );

export const Activity =
    mongoose.model(
        "Activity",
        activitySchema
    );