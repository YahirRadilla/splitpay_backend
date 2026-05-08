import { Router } from "express";

import {
    admin,
    login,
    me,
    register,
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

export default router;