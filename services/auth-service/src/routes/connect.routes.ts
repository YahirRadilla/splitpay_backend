import { Router } from "express";

import {
    createAccount,
    onboarding,
    status,
} from "../controllers/connect.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
    "/connect/account",
    authMiddleware,
    createAccount
);

router.post(
    "/connect/onboarding",
    authMiddleware,
    onboarding
);

router.get(
    "/connect/status",
    authMiddleware,
    status
);

export default router;