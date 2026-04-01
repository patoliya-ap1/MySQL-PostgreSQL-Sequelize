import { MiniEcomOrderModel } from "../../model";
import { createOrder } from "../../utils/miniEcomOrderService";
import { NextFunction, Request, Response } from "express";

/**
 *  create orders from the database.
 *
 * @async
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} Sends a JSON response with the order.
 */

export const placeOrder = async (req: Request, res: Response) => {
  const { userId, items } = req.body;

  const order = await createOrder(userId, items);

  res.status(200).json({
    success: true,
    message: "orders placed successfully.",
    order: order,
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
  const orders = await MiniEcomOrderModel.findAll();
  res.status(200).json({
    success: true,
    message: "orders fetched successfully.",
    orders,
  });
};

/**
 * Deletes a order record identified by ID.
 *
 * @async
 * @param {Request} req - Express request object, expects order ID in req.params.id.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} Sends a JSON response with the deleted order data.
 */
export const deleteOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const orderId = req.params.id as string;
  const order = await MiniEcomOrderModel.findByPk(orderId);

  const deletedOrder = await MiniEcomOrderModel.destroy({
    where: { id: orderId },
  });
  res.status(200).json({
    success: true,
    message: "order deleted successfully.",
    deletedOrder: order,
  });
};
