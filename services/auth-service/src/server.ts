import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import billingRoutes from "./routes/billing.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import { webhook } from "./controllers/payment.controller.js";
import connectRoutes from "./routes/connect.routes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.post(
  "/payments/webhook",
  express.raw({
    type: "application/json",
  }),
  webhook
);

app.use(express.json());

app.use("/", authRoutes);
app.use("/", billingRoutes);
app.use("/", paymentRoutes);
app.use("/", connectRoutes);

app.get("/health", (_, res) => {
  res.json({ status: "Auth service running" });
});

connectDB();

app.listen(3001, () => {
  console.log("Auth service on 3001");
});