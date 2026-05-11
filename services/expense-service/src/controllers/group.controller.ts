import type { Request, Response } from "express";

import {
    addMember,
    createGroup,
    getGroups,
} from "../services/group.service.js";

export const create = async (
    req: any,
    res: Response
) => {
    try {
        const group = await createGroup(
            req.body.name,
            req.user.id
        );

        res.status(201).json(group);
    } catch (error: any) {
        res.status(400).json({
            error: error.message,
        });
    }
};

export const getAll = async (
    req: any,
    res: Response
) => {
    try {
        const groups = await getGroups(
            req.user.id
        );

        res.status(200).json(groups);
    } catch (error: any) {
        res.status(400).json({
            error: error.message,
        });
    }
};

export const add = async (
    req: Request,
    res: Response
) => {
    try {
        const group = await addMember(
            req.params.id as string,
            req.body.userId
        );

        res.status(200).json(group);
    } catch (error: any) {
        res.status(400).json({
            error: error.message,
        });
    }
};