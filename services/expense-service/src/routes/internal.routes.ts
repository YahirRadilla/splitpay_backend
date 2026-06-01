import { Router } from "express";

import {
    createSettlementInternal,
} from "../controllers/internal.controller.js";

const router = Router();

router.post(
    "/internal/settlements",
    createSettlementInternal
);

export default router;