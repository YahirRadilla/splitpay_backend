import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./config/db.js";
import groupRoutes from "./routes/group.routes.js";
import expenseRoutes from "./routes/expense.routes.js";
import balanceRoutes from "./routes/balance.routes.js";
import settlementRoutes from "./routes/settlement.routes.js";
import invitationRoutes from "./routes/invitation.routes.js";
import activityRoutes from "./routes/activity.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import syncRoutes from "./routes/sync.routes.js";
import internalRoutes from "./routes/internal.routes.js";

dotenv.config();

const app = express();

app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    })
);

app.use(express.json());

app.use("/", groupRoutes);
app.use("/", expenseRoutes);
app.use("/", balanceRoutes);
app.use("/", settlementRoutes);
app.use("/", invitationRoutes);
app.use("/", activityRoutes);
app.use("/", notificationRoutes);
app.use("/", syncRoutes);
app.use(internalRoutes);

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
    console.log(`Expense service on ${PORT}`);
});

connectDB();