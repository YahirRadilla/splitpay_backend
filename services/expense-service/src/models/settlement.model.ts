import mongoose from "mongoose";

const settlementSchema = new mongoose.Schema(
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
        deletedAt: {
            type: Date,
            default: null,
        }
    },
    {
        timestamps: true,
    }
);


settlementSchema.index({
    groupId: 1,
    updatedAt: 1,
});

export const Settlement = mongoose.model(
    "Settlement",
    settlementSchema
);