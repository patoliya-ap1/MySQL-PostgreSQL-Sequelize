import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  updateProduct,
} from "../../controller/product/productController";

export const productRouter = express.Router();

// get product
productRouter.get("/", getProduct);

// create product
productRouter.post("/", createProduct);

// update product
productRouter.put("/:id", updateProduct);

// delete product
productRouter.delete("/:id", deleteProduct);
