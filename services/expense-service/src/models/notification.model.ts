import mongoose from "mongoose";

const notificationSchema =
    new mongoose.Schema(
        {
            userId: {
                type: String,
                required: true,
            },

            type: {
                type: String,
                required: true,
            },

            title: {
                type: String,
                required: true,
            },

            message: {
                type: String,
                required: true,
            },

            read: {
                type: Boolean,
                default: false,
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

export const Notification =
    mongoose.model(
        "Notification",
        notificationSchema
    );