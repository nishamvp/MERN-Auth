import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bcryptjs from "bcryptjs";
import { notFound, errorHandler } from "./middleware/errorMiddleWare.js";

import { connectDB } from "./config/db.js";

import userRouter from "./routes/routes.js";
dotenv.config();

connectDB()
const port = process.env.PORT || 5000;
const app = express();
//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use("/api/users", userRouter);

app.get("/", (req, res) => res.send("server is ready.."));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
