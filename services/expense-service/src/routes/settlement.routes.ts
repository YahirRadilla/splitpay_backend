import { Router } from "express";

import { authMiddleware } from "../middlewares/auth.middleware.js";

import { getSettlements } from "../controllers/settlement.controller.js";

const router = Router();

router.get(
    "/groups/:groupId/settlements",
    authMiddleware,
    getSettlements
);

export default router;