import express from 'express';
import { createProduct, getProduct,deleteProduct,updateProduct } from '../../controller/mini-ecom-product/miniEcomProductController';

export const ecomProductRouter = express.Router();

// get product
ecomProductRouter.get("/", getProduct);

// create product
ecomProductRouter.post("/", createProduct);

// update product
ecomProductRouter.put("/:id", updateProduct);

// delete product
ecomProductRouter.delete("/:id", deleteProduct);