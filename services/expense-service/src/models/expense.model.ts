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
    },
    {
        timestamps: true,
    }
);

export const Expense = mongoose.model(
    "Expense",
    expenseSchema
);