import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: true,
        },

        avatar: {
            type: String,
            default: "",
        },

        bio: {
            type: String,
            default: "",
        },

        phone: {
            type: String,
            default: "",
        },

        address: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

export const Profile = mongoose.model(
    "Profile",
    profileSchema
);