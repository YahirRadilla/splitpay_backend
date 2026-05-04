import type { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service.js";

export const register = async (req: Request, res: Response) => {
    console.log("BODY:", req.body);
    try {
        const { email, password, name, lastName } = req.body;

        const user = await registerUser(email, password, name, lastName);

        res.json(user);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const token = await loginUser(email, password);

        res.json({ token, user: { email } });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};