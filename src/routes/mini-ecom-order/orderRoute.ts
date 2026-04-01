import express from "express";
import {
  placeOrder,
  getOrder,
  deleteOrder,
} from "../../controller/mini-ecom-order/miniEcomOrderController";

export const ecomOrderRouter = express.Router();

ecomOrderRouter.post("/", placeOrder);

// get order
ecomOrderRouter.get("/", getOrder);

// create order
ecomOrderRouter.post("/", placeOrder);

// delete product
ecomOrderRouter.delete("/:id", deleteOrder);
