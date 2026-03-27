import express from "express";
import {
  createUser,
  deleteUser,
  getUser,
  updateUser,
} from "../../controller/ecom-user/ecomUserController";

export const ecomUserRouter = express.Router();

// get user
ecomUserRouter.get("/", getUser);

// create user
ecomUserRouter.post("/", createUser);

// update user by id
ecomUserRouter.put("/:id", updateUser);

// delete user by id
ecomUserRouter.delete("/:id", deleteUser);
