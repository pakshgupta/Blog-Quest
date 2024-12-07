import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
export const app = express();
app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.get("/", (_, res) => {
    res.send("Api is working with /api/v1");
});
import UserRouter from "./routes/user.route.js";
app.use("/api/v1/user/", UserRouter);
