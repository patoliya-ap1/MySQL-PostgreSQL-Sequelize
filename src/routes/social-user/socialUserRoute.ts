import express from "express";
import {
  createUser,
  deleteUser,
  getUser,
  updateUser,
} from "../../controller/social-user/socialUserController";

export const socialUserRouter = express.Router();

// get user
socialUserRouter.get("/", getUser);

// create user
socialUserRouter.post("/", createUser);

// update user by id
socialUserRouter.put("/:id", updateUser);

// delete user by id
socialUserRouter.delete("/:id", deleteUser);
