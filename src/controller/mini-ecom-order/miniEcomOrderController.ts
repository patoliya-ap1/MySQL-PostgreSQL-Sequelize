import { sequelize } from "../../config/db.config";
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

//  Top 3 users by top spends
export const topUserBySpending = async (req: Request, res: Response) => {
  const result = await sequelize.query(`
    SELECT
    u.name,
    SUM(o."totalAmount") as total_spent,
    RANK() OVER (ORDER BY SUM(o."totalAmount") DESC) as user_rank
FROM "miniecom-users" u
JOIN "miniecom-orders" o ON u.id = o."userId"
GROUP BY u.id, u.name
LIMIT 3;
  `);

  res.status(200).json({
    success: true,
    message: "top 3 users fetched successfully.",
    data: result[0],
  });
};

// total revenue and numbers of order per user
export const totalRevenueAndOrderPerUser = async (
  req: Request,
  res: Response,
) => {
  const result = await sequelize.query(`
    SELECT
    u.name,
    u.email,
    COUNT(o.id) as total_orders,
    SUM(o."totalAmount") as total_revenue
FROM "miniecom-users" u
JOIN "miniecom-orders" o ON u.id = o."userId"
GROUP BY u.id, u.name, u.email
ORDER BY total_revenue DESC;

  `);

  res.status(200).json({
    success: true,
    message: "total revenue and orders fetched successfully.",
    data: result[0],
  });
};

// top 5 most selling products

export const topSellingProducts = async (req: Request, res: Response) => {
  const result = await sequelize.query(`
    SELECT
    p.name,
    SUM(oi.quantity) as total_qty
FROM "miniecom-products" p
JOIN "miniecom-orderItems" oi ON p.id = oi."productId"
GROUP BY p.name
ORDER BY total_qty DESC
LIMIT 5;
  `);

  res.status(200).json({
    success: true,
    message: "top selling products fetched successfully.",
    data: result[0],
  });
};
