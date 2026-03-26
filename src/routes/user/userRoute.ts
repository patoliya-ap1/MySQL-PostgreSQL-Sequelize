import express from "express";
import {
  createUser,
  deleteUser,
  getUser,
  updateUser,
} from "../../controller/users/userController";

export const userRouter = express.Router();

// get user
userRouter.get("/", getUser);

// create user
userRouter.post("/", createUser);

// update user by id
userRouter.put("/:id", updateUser);

// delete user by id
userRouter.delete("/:id", deleteUser);
