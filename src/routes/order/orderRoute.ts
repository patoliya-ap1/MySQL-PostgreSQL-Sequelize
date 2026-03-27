import express from "express";
import { createOrder, getOrder } from "../../controller/order/orderController";

export const orderRouter = express.Router();

// get order
orderRouter.get("/", getOrder);

// create order
orderRouter.post("/:id", createOrder);
