import type { NextFunction, Response } from "express";

export const authorize = (...roles: string[]) => {
    return (
        req: any,
        res: Response,
        next: NextFunction
    ) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                error: "Forbidden",
            });
        }

        next();
    };
};