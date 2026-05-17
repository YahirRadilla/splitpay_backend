import { Router } from "express";

import { authMiddleware } from "../middlewares/auth.middleware.js";

import {
    create,
    getSettlements,
    history,
} from "../controllers/settlement.controller.js";

const router = Router();

router.post(
    "/settlements",
    authMiddleware,
    create
);

router.get(
    "/groups/:groupId/settlements",
    authMiddleware,
    getSettlements
);

router.get(
    "/groups/:groupId/settlements/history",
    authMiddleware,
    history
);

export default router;