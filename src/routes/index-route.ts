import express from "express";
import { studentRouter } from "./student/studentRoute";
import { bookRouter } from "./book/bookRoute";
import { userRouter } from "./user/userRoute";

// main route
export const mainRouter = express.Router();

// students routes
mainRouter.use("/students", studentRouter);

// books routes
mainRouter.use("/books", bookRouter);

// users routes
mainRouter.use("/users", userRouter);
