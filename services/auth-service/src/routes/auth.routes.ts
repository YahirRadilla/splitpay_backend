import { Router } from "express";

import {
    admin,
    getUser,
    login,
    me,
    register,
    search,
} from "../controllers/auth.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.get(
    "/me",
    authMiddleware,
    me
);

router.get(
    "/admin",
    authMiddleware,
    authorize("admin"),
    admin
);

router.get(
    "/users/search",
    authMiddleware,
    search
);

router.get(
    '/users/:id',
    authMiddleware,
    getUser
)

export default router;