import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";

import { connectDB } from "./config/db";
import authRouter from "./routers/auth";
import contactRouter from "./routers/contact";

const app = express();
dotenv.config();
// middleware
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

// connect db
connectDB(process.env.DB_URI);

// routers
app.use("/api", authRouter);
app.use("/api/contacts", contactRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Máy chủ đang chạy trên cổng ${PORT}`);
});

export const viteNodeApp = app;
