import { NextFunction, Request, Response } from "express";
import { SocialLikeModel } from "../../model/index";

/**
 * Fetches all likes from the database.
 *
 * @async
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} Sends a JSON response with the list of likes.
 */
export const getLike = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const likes = await SocialLikeModel.findAll();
  res.status(200).json({
    success: true,
    message: "likes fetched successfully.",
    likes,
  });
};

/**
 * Creates a new like in the database.
 *
 * @async
 * @param {Request} req - Express request object, expects like data in req.body.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} Sends a JSON response with the newly created like.
 */
export const createLike = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const postId = req.params.id;
  const likeData = req.body;
  const newLike = await SocialLikeModel.create({ ...likeData, postId });
  res.status(201).json({
    success: true,
    message: "new like created successfully.",
    newLike,
  });
};

/**
 * Deletes a like record identified by ID.
 *
 * @async
 * @param {Request} req - Express request object, expects like ID in req.params.id.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} Sends a JSON response with the deleted like data.
 */
export const deleteLike = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const likeId = req.params.id as string;
  const like = await SocialLikeModel.findByPk(likeId);
  const deletedLike = await SocialLikeModel.destroy({
    where: { id: likeId },
  });
  res.status(200).json({
    success: true,
    message: "like deleted successfully.",
    deletedLike: like,
  });
};
