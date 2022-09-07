import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/users.js";
import videoRoute from "./routes/videos.js";
import commentRoute from "./routes/comments.js";
import authRoute from "./routes/auth.js";
import cookieParser from "cookie-parser";

//configuration and variables
const app = express();
dotenv.config();

// mongodb connection
const connect = () => {
  mongoose
    .connect(process.env.DB)
    .then(() => console.log("Connected to database!"))
    .catch((err) => console.error());
};

// middlewares
app.use(express.json());
app.use(cookieParser());
// routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/videos", videoRoute);
app.use("/api/comments", commentRoute);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});
// listen to server
app.listen(process.env.PORT, () => {
  connect();
  console.log("Server is running ...!");
});
