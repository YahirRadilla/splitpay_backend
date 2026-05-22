import { Router } from "express";

import { authMiddleware } from "../middlewares/auth.middleware.js";

import { addPaymentMethod } from "../controllers/billing.controller.js";

const router = Router();

router.post(
    "/payment-methods",
    authMiddleware,
    addPaymentMethod
);

export default router;