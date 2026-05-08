import type { Response } from "express";

import {
    createProfile,
    getProfile,
    updateProfile,
} from "../services/profile.service.js";

export const create = async (
    req: any,
    res: Response
) => {
    try {
        const profile = await createProfile(
            req.user.id
        );

        res.status(201).json(profile);
    } catch (error: any) {
        res.status(400).json({
            error: error.message,
        });
    }
};

export const me = async (
    req: any,
    res: Response
) => {
    try {
        const profile = await getProfile(
            req.user.id
        );

        res.status(200).json(profile);
    } catch (error: any) {
        res.status(400).json({
            error: error.message,
        });
    }
};

export const update = async (
    req: any,
    res: Response
) => {
    try {
        const profile = await updateProfile(
            req.user.id,
            req.body
        );

        res.status(200).json(profile);
    } catch (error: any) {
        res.status(400).json({
            error: error.message,
        });
    }
};