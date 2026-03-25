import express from "express";
import { studentRouter } from "./student/studentRoute";

// main route
export const mainRouter = express.Router();

// students routes
mainRouter.use("/students", studentRouter);
