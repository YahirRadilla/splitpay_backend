import { Router } from "express";

import { authMiddleware } from "../middlewares/auth.middleware.js";

import { bootstrap, changes } from "../controllers/sync.controller.js";

const router = Router();

router.get(
    "/sync/bootstrap",
    authMiddleware,
    bootstrap
);

router.get(
    "/sync/changes",
    authMiddleware,
    changes
);

export default router;