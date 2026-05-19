import { Router } from "express";

import {
    add,
    create,
    getAll,
    getOne,
} from "../controllers/group.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
    "/groups",
    authMiddleware,
    create
);

router.get(
    "/groups",
    authMiddleware,
    getAll
);

router.get(
    '/groups/:id',
    authMiddleware,
    getOne
)

router.post(
    "/groups/:id/members",
    authMiddleware,
    add
);

export default router;