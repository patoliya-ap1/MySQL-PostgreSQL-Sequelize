import { NextFunction, Request, Response } from "express";
import { OrderModel, ProductModel } from "../../model/index";
import { orderPlace } from "../../utils/createOrderService";
/**
 * create Order by productID.
 *
 * @async
 * @param {Request} req - Express request object, expects product ID in req.params.id.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} Sends a JSON response with the created order.
 */
export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { userId, quantity } = req.body;
  const productId = req.params.id;
  const data = { userId, productId, quantity };
  const newOrder = await orderPlace(data);
  res.status(200).json({
    success: true,
    message: "order placed successfully.",
    newOrder,
  });
};

/**
 * Fetches all orders from the database.
 *
 * @async
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} Sends a JSON response with the list of orders.
 */
export const getOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const students = await OrderModel.findAll();
  res.status(200).json({
    success: true,
    message: "orders fetched successfully.",
    students,
  });
};
