import { Router } from "express";
import { services } from "../config/services.js";
import { createProxy } from "../services/proxy.service.js";

const router = Router();

router.use("/auth", createProxy(services.auth));


export default router;