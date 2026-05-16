import { Router } from "express";

import {
    create,
    getAll,
} from "../controllers/expense.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
    "/",
    authMiddleware,
    create
);

router.get(
    "/groups/:groupId/expenses",
    authMiddleware,
    getAll
);

export default router;