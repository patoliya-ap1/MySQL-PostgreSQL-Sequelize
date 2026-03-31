import express from "express";
import { studentRouter } from "./student/studentRoute";
import { bookRouter } from "./book/bookRoute";
import { userRouter } from "./user/userRoute";
import { ecomUserRouter } from "./ecom-user/ecomUserRoute";
import { productRouter } from "./product/productRoute";
import { orderRouter } from "./order/orderRoute";
import { accountRouter } from "./account/accountRoute";
import { bankUserRouter } from "./bank-user/bankUserRoute";
import { socialUserRouter } from "./social-user/socialUserRoute";
import { socialPostRouter } from "./post/postRoute";
import { socialLikeRouter } from "./like/likeRoute";
import { analyticsRouter } from "./social/analyticsRoute";

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

// bank users routes
mainRouter.use("/bank/users", bankUserRouter);

// bank account routes
mainRouter.use("/bank", accountRouter);

// social users routes
mainRouter.use("/social/users", socialUserRouter);

// social post routes
mainRouter.use("/social/posts", socialPostRouter);

// social likes routes
mainRouter.use("/social/likes", socialLikeRouter);

// social analytics routes
mainRouter.use("/social/analytics", analyticsRouter);
