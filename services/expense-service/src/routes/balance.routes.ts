import { Router } from "express";

import { authMiddleware } from "../middlewares/auth.middleware.js";

import { getBalances } from "../controllers/balance.controller.js";

const router = Router();

router.get(
    "/groups/:groupId/balances",
    authMiddleware,
    getBalances
);

export default router;