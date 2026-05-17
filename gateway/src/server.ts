import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/index.js";


dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api", routes);

app.get("/", (_, res) => {
  res.send("OK");
});

app.listen(3000, () => {
  console.log("Server running");
});