import { Router } from "express";

import {
    create,
    getAll,
} from "../controllers/expense.controller.js";


import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createExpenseSchema } from "../validators/expense.validator.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = Router();

router.post(
    "/expense",
    authMiddleware,
    validate(createExpenseSchema),
    create
);

router.get(
    "/groups/:groupId/expenses",
    authMiddleware,
    getAll
);

export default router;