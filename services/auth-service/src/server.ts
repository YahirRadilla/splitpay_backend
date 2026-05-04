import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", authRoutes);

app.get("/health", (_, res) => {
    res.json({ status: "Auth service running" });
});

connectDB();

app.listen(3001, () => {
    console.log("Auth service on 3001");
});