import express from "express";
import {
  createPost,
  getPost,
  updatePost,
  deletePost,
} from "../../controller/post/postController";

export const socialPostRouter = express.Router();

// get post
socialPostRouter.get("/", getPost);

// create post
socialPostRouter.post("/", createPost);

// update post by id
socialPostRouter.put("/:id", updatePost);

// delete post by id
socialPostRouter.delete("/:id", deletePost);
