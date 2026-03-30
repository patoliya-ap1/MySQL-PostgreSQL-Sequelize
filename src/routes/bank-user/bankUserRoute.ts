import express from "express";
import {
  createUser,
  deleteUser,
  getUser,
  updateUser,
} from "../../controller/bank-user/bankUserController";

export const bankUserRouter = express.Router();

// get user
bankUserRouter.get("/", getUser);

// create user
bankUserRouter.post("/", createUser);

// update user by id
bankUserRouter.put("/:id", updateUser);

// delete user by id
bankUserRouter.delete("/:id", deleteUser);
