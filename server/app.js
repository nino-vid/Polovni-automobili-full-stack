import express from "express";
import { config } from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import cors from "cors";

config({
  path: "./data/config.env",
});

export const app = express();

app.use(
  cors({
    origin: "https://polovni-automobili.vercel.app",
    credentials: true,
  })
);

// Using Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(errorMiddleware);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - Body:`, req.body);
  next();
});

app.get("/", (req, res, next) => {
  res.send("Working!!!");
});

import user from "./routes/user.js";

app.use("/user", user);

app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "Not Found" });
});
