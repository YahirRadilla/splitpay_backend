import mongoose from "mongoose";

const splitSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },

        amount: {
            type: Number,
            required: true,
        },
    },
    {
        _id: false,
    }
);

const expenseSchema = new mongoose.Schema(
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

        paidBy: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        amount: {
            type: Number,
            required: true,
        },

        splits: [splitSchema],
        deletedAt: {
            type: Date,
            default: null,
        }
    },
    {
        timestamps: true,
    }
);


expenseSchema.index({
    groupId: 1,
    updatedAt: 1,
});

export const Expense = mongoose.model(
    "Expense",
    expenseSchema
);