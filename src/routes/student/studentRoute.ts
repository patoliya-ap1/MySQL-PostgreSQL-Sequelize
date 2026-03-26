import express from "express";
import {
  createStudent,
  deleteStudent,
  getStudent,
  updateStudent,
} from "../../controller/student/studentController";

export const studentRouter = express.Router();

// get student
studentRouter.get("/", getStudent);

// create student
studentRouter.post("/", createStudent);

// update student by id
studentRouter.put("/:id", updateStudent);

// delete student by id
studentRouter.delete("/:id", deleteStudent);
