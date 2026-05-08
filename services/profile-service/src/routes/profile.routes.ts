import { Router } from "express";

import {
    create,
    me,
    update,
} from "../controllers/profile.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
    "/",
    authMiddleware,
    create
);

router.get(
    "/me",
    authMiddleware,
    me
);

router.put(
    "/",
    authMiddleware,
    update
);

export default router;