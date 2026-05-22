import { Router } from "express";

import { authMiddleware } from "../middlewares/auth.middleware.js";

import {
    mine,
    read,
} from "../controllers/notification.controller.js";

const router = Router();

router.get(
    "/notifications/me",
    authMiddleware,
    mine
);

router.post(
    "/notifications/:id/read",
    authMiddleware,
    read
);

export default router;