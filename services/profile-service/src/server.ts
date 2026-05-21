import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./config/db.js";
import profileRoutes from "./routes/profile.routes.js";

dotenv.config();

const app = express();

app.use(
    cors({
        origin:
            'http://localhost:5173',

        credentials: true,
    })
)

app.use(express.json());

app.use("/", profileRoutes);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
    console.log(`Profile service on ${PORT}`);
});

connectDB();