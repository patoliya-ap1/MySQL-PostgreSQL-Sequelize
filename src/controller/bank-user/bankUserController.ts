import { NextFunction, Request, Response } from "express";
import { BankUserModel } from "../../model/index";

/**
 * Fetches all users from the database.
 *
 * @async
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} Sends a JSON response with the list of users.
 */
export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const users = await BankUserModel.findAll();
  res.status(200).json({
    success: true,
    message: "users fetched successfully.",
    users,
  });
};

/**
 * Creates a new user record in the database.
 *
 * @async
 * @param {Request} req - Express request object, expects user data in req.body.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} Sends a JSON response with the newly created user.
 */
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userData = req.body;
  const newUser = await BankUserModel.create(userData);
  res.status(201).json({
    success: true,
    message: "new user created successfully.",
    newUser,
  });
};

/**
 * Updates an existing user record identified by ID.
 *
 * @async
 * @param {Request} req - Express request object, expects user ID in req.params.id and update data in req.body.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} Sends a JSON response with the updated user.
 */
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.params.id;
  const dataForUpdate = req.body;
  const [count, rows] = await BankUserModel.update(dataForUpdate, {
    where: { id: userId },
    returning: true,
  });
  res.status(200).json({
    success: true,
    message: "user updated successfully.",
    updatedUser: rows[0],
  });
};

/**
 * Deletes a user record identified by ID.
 *
 * @async
 * @param {Request} req - Express request object, expects user ID in req.params.id.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} Sends a JSON response with the deleted user data.
 */
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.params.id as string;
  const user = await BankUserModel.findByPk(userId);
  if (user) {
  }
  const deletedUser = await BankUserModel.destroy({
    where: { id: userId },
  });
  res.status(200).json({
    success: true,
    message: "user deleted successfully.",
    deletedUser: user,
  });
};
