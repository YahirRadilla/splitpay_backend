import { Profile } from "../models/profile.model.js";

export const createProfile = async (
    userId: string
) => {
    const existingProfile = await Profile.findOne({
        userId,
    });

    if (existingProfile) {
        throw new Error("Profile already exists");
    }

    const profile = await Profile.create({
        userId,
    });

    return profile;
};

export const getProfile = async (
    userId: string
) => {
    const profile = await Profile.findOne({
        userId,
    });

    return profile;
};

export const updateProfile = async (
    userId: string,
    data: any
) => {
    const profile = await Profile.findOneAndUpdate(
        {
            userId,
        },
        data,
        {
            new: true,
        }
    );

    return profile;
};