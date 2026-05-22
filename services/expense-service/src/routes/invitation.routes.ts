import { Router } from "express";

import { authMiddleware } from "../middlewares/auth.middleware.js";

import {
    accept,
    create,
    mine,
    reject,
} from "../controllers/invitation.controller.js";

const router = Router();

router.post(
    "/groups/:groupId/invitations",
    authMiddleware,
    create
);

router.post(
    "/invitations/:id/accept",
    authMiddleware,
    accept
);

router.post(
    "/invitations/:id/reject",
    authMiddleware,
    reject
);

router.get(
    "/invitations/me",
    authMiddleware,
    mine
);

export default router;