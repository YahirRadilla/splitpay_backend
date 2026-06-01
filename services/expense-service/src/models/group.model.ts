import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        ownerId: {
            type: String,
            required: true,
        },

        members: [
            {
                type: String,
            },
        ],
        deletedAt: {
            type: Date,
            default: null,
        }
    },
    {
        timestamps: true,
    }
);

groupSchema.index({
    members: 1,
});

groupSchema.index({
    updatedAt: 1,
});

export const Group = mongoose.model(
    "Group",
    groupSchema
);