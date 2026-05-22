import { Router } from "express";

import { authMiddleware } from "../middlewares/auth.middleware.js";

import { getActivities } from "../controllers/activity.controller.js";

const router = Router();

router.get(
    "/groups/:groupId/activities",
    authMiddleware,
    getActivities
);

export default router;