import express from "express";
import {
  avgOrderValue,
  createOrder,
  getOrder,
  ordersInLastWeek,
  topCustomer,
  totalSales,
} from "../../controller/order/orderController";

export const orderRouter = express.Router();

// get order
orderRouter.get("/", getOrder);

// create order
orderRouter.post("/:id", createOrder);

// total sales
orderRouter.get("/total-sales", totalSales);

// total sales
orderRouter.get("/average-order-value", avgOrderValue);

//orders in last 7 days.
orderRouter.get("/last-week", ordersInLastWeek);

//top customers
orderRouter.get("/top-customer", topCustomer);
