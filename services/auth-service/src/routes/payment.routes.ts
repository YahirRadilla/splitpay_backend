import { Router } from "express";

import {
    paymentMethods,
    removePaymentMethod,
    setupIntent,
    webhook,
    settle

} from "../controllers/payment.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { paymentLimiter } from "../middlewares/rate-limit.js";

const router = Router();

router.post(
    "/payments/setup-intent",
    paymentLimiter,
    authMiddleware,
    setupIntent
);

router.get(
    "/payments/methods",
    authMiddleware,
    paymentMethods
);

router.delete(
    "/payments/methods/:paymentMethodId",
    authMiddleware,
    removePaymentMethod
);

router.post(
    "/payments/webhook",
    webhook
);

router.post(
    "/payments/settle",
    authMiddleware,
    paymentLimiter,
    settle
);

export default router;