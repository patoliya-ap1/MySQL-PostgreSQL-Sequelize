import express from "express";
import {
  placeOrder,
  getOrder,
  deleteOrder,
  topUserBySpending,
  totalRevenueAndOrderPerUser,
  topSellingProducts,
} from "../../controller/mini-ecom-order/miniEcomOrderController";

export const ecomOrderRouter = express.Router();

ecomOrderRouter.post("/", placeOrder);

// get order
ecomOrderRouter.get("/", getOrder);

// create order
ecomOrderRouter.post("/", placeOrder);

// delete product
ecomOrderRouter.delete("/:id", deleteOrder);

// top 3 users by top spends
ecomOrderRouter.get("/top-spending-users", topUserBySpending);

// total revenue and orders per user
ecomOrderRouter.get("/total-revenue-orders-per-user", totalRevenueAndOrderPerUser);

// top 5 most selling products
ecomOrderRouter.get("/top-selling-products",topSellingProducts)