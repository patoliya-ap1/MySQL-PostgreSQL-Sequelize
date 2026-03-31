import express from "express";
import {
  getLike,
  createLike,
  deleteLike,
} from "../../controller/like/likeController";

export const socialLikeRouter = express.Router();

// get user
socialLikeRouter.get("/", getLike);

// create user
socialLikeRouter.post("/:id", createLike);

// delete user by id
socialLikeRouter.delete("/:id", deleteLike);
