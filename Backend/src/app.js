import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";

import { connectDB } from "./config/db.js";
import authRouter from "./routers/auth.js";
import contactRouter from "./routers/contact.js";
import postRouter from "./routers/post.js";
import commentRouter from "./routers/comment.js";
import topicRouter from "./routers/topic.js";
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
app.use('/api', postRouter);
app.use("/api", contactRouter);
app.use("/api", commentRouter);
app.use("/api", topicRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Máy chủ đang chạy trên cổng ${PORT}`);
});

export const viteNodeApp = app;
//