import { NextFunction, Request, Response } from "express";
import { OrderModel } from "../../model/index";
import { orderPlace } from "../../utils/createOrderService";
import { sequelize } from "../../config/db.config";
import { QueryTypes } from "sequelize";
const { fn, col, Op } = require("sequelize");

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

/**
 * Total sales per user
 *
 * @async
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} Sends a JSON response with the Total sales.
 */
export const totalSales = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const newOrder = await OrderModel.findAll({
    attributes: ["userId", [fn("SUM", col("amount")), "totalSales"]],
    group: ["userId"],
  });
  res.status(200).json({
    success: true,
    message: "total sales fetched successfully.",
    newOrder,
  });
};

/**
 * get average order value
 *
 * @async
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} Sends a JSON response with the created order.
 */
export const avgOrderValue = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const data = await OrderModel.findOne({
    attributes: [[fn("AVG", col("amount")), "averageOrderValue"]],
  });
  res.status(200).json({
    success: true,
    message: "average order value fetched successfully.",
    data,
  });
};

/**
 * get orders in last 7 days
 *
 * @async
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} Sends a JSON response with the orders in last 7 days.
 */
export const ordersInLastWeek = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const orders = await OrderModel.findAll({
    where: {
      date: {
        [Op.gte]: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
    },
  });
  res.status(200).json({
    success: true,
    message: "orders in last 7 days fetched successfully.",
    orders,
  });
};

/**
 * top customers
 *
 * @async
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} Sends a JSON response with top customer
 */
export const topCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const orders = await sequelize.query("SELECT * FROM top_customers", {
    type: QueryTypes.SELECT,
  });
  res.status(200).json({
    success: true,
    message: "top customers fetched successfully.",
    orders,
  });
};
