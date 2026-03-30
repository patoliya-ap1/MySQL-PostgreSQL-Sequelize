import express from "express";
import { studentRouter } from "./student/studentRoute";
import { bookRouter } from "./book/bookRoute";
import { userRouter } from "./user/userRoute";
import { ecomUserRouter } from "./ecom-user/ecomUserRoute";
import { productRouter } from "./product/productRoute";
import { orderRouter } from "./order/orderRoute";
import { accountRouter } from "./account/accountRoute";

// main route
export const mainRouter = express.Router();

// students routes
mainRouter.use("/students", studentRouter);

// books routes
mainRouter.use("/books", bookRouter);

// users routes
mainRouter.use("/users", userRouter);

// ecommerce users routes
mainRouter.use("/ecom/users", ecomUserRouter);

// products routes
mainRouter.use("/products", productRouter);

// orders routes
mainRouter.use("/orders", orderRouter);

// account routes
mainRouter.use("/account", accountRouter);
