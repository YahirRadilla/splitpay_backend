import mongoose from "mongoose";

const settlementSchema = new mongoose.Schema(
    {
        groupId: {
            type: String,
            required: true,
        },

        fromUserId: {
            type: String,
            required: true,
        },

        toUserId: {
            type: String,
            required: true,
        },

        amount: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    {
        timestamps: true,
    }
);

export const Settlement = mongoose.model(
    "Settlement",
    settlementSchema
);