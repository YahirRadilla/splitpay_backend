import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./config/db.js";
import groupRoutes from "./routes/group.routes.js";
import expenseRoutes from "./routes/expense.routes.js";
import balanceRoutes from "./routes/balance.routes.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/", groupRoutes);
app.use("/", expenseRoutes);
app.use("/", balanceRoutes);

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
    console.log(`Expense service on ${PORT}`);
});

connectDB();