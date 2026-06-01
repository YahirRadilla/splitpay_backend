import express from "express";

import http from "http";

import cors from "cors";

import dotenv from "dotenv";

import { Server } from "socket.io";

import { registerSockets } from "./sockets/socket.js";

import { setSocketServer } from "./events/emitters.js";

import eventRoutes from "./routes/event.routes.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.get(
    "/health",
    (_, res) => {
        res.json({
            status:
                "Realtime running",
        });
    }
);

app.get("/test", (_, res) => {
    res.json({
        ok: true,
    });
});

const server =
    http.createServer(app);

const io =
    new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true,
        },
    });

registerSockets(io);

setSocketServer(io);

app.use("/events", eventRoutes);

const PORT =
    process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(
        `Realtime service on ${PORT}`
    );
});