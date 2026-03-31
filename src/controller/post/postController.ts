import { NextFunction, Request, Response } from "express";
import { SocialPostModel } from "../../model/index";

/**
 * Fetches all posts from the database.
 *
 * @async
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} Sends a JSON response with the list of posts.
 */
export const getPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const posts = await SocialPostModel.findAll();
  res.status(200).json({
    success: true,
    message: "posts fetched successfully.",
    posts,
  });
};

/**
 * Creates a new post in the database.
 *
 * @async
 * @param {Request} req - Express request object, expects post data in req.body.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} Sends a JSON response with the newly created post.
 */
export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const postData = req.body;
  const newPost = await SocialPostModel.create(postData);
  res.status(201).json({
    success: true,
    message: "new post created successfully.",
    newPost,
  });
};

/**
 * Updates an existing post record identified by ID.
 *
 * @async
 * @param {Request} req - Express request object, expects post ID in req.params.id and update data in req.body.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} Sends a JSON response with the updated post.
 */
export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const postId = req.params.id;
  const dataForUpdate = req.body;
  const [count, rows] = await SocialPostModel.update(dataForUpdate, {
    where: { id: postId },
    returning: true,
  });
  res.status(200).json({
    success: true,
    message: "post updated successfully.",
    updatedPost: rows[0],
  });
};

/**
 * Deletes a post record identified by ID.
 *
 * @async
 * @param {Request} req - Express request object, expects post ID in req.params.id.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} Sends a JSON response with the deleted post data.
 */
export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const postId = req.params.id as string;
  const post = await SocialPostModel.findByPk(postId);
  const deletedPost = await SocialPostModel.destroy({
    where: { id: postId },
  });
  res.status(200).json({
    success: true,
    message: "post deleted successfully.",
    deletedPost: post,
  });
};
