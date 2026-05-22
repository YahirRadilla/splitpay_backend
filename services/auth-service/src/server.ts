import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import billingRoutes from "./routes/billing.routes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.use("/", authRoutes);
app.use("/", billingRoutes);

app.get("/health", (_, res) => {
  res.json({ status: "Auth service running" });
});

connectDB();

app.listen(3001, () => {
  console.log("Auth service on 3001");
});