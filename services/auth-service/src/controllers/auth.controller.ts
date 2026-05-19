import type { Request, Response } from "express";

import {
    getUserById,
    loginUser,
    registerUser,
    searchUsers,
} from "../services/auth.service.js";

export const register = async (
    req: Request,
    res: Response
) => {
    try {
        const { email, password, name, lastName } =
            req.body;

        const user = await registerUser(
            email,
            password,
            name,
            lastName
        );

        res.status(201).json(user);
    } catch (error: any) {
        res.status(400).json({
            error: error.message,
        });
    }
};

export const login = async (
    req: Request,
    res: Response
) => {
    try {
        const { email, password } = req.body;

        const data = await loginUser(email, password);

        res.status(200).json(data);
    } catch (error: any) {
        res.status(401).json({
            error: error.message,
        });
    }
};

export const me = async (
    req: any,
    res: Response
) => {
    res.status(200).json({
        user: req.user,
    });
};

export const admin = async (
    req: any,
    res: Response
) => {
    res.status(200).json({
        message: "Admin route",
    });
};

export const getUser = async (
    req: Request,
    res: Response
) => {
    try {
        const user =
            await getUserById(
                req.params.id as string
            )

        res.status(200).json(user)
    } catch (error: any) {
        res.status(400).json({
            error: error.message,
        })
    }
}

export const search = async (
    req: Request,
    res: Response
) => {
    try {
        const query =
            req.query.q?.toString() || "";

        const users =
            await searchUsers(query);

        res.status(200).json(users);
    } catch (error: any) {
        res.status(400).json({
            error: error.message,
        });
    }
};