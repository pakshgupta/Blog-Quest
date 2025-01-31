import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

export const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // The exact URL of your frontend
    methods: ["GET", "PUT", "DELETE", "POST"],
    credentials: true, // Allow sending cookies
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.get("/", (_, res) => {
  res.send("Api is working with /api/v1");
});

import CommentRouter from "./routes/comment.route.js";
import LikeRouter from "./routes/likes.route.js";
import PostRouter from "./routes/post.route.js";
import UserRouter from "./routes/user.route.js";
app.use("/api/v1/user/", UserRouter);
app.use("/api/v1/post/", PostRouter);
app.use("/api/v1/comment/", CommentRouter);
app.use("/api/v1/likes/", LikeRouter);
