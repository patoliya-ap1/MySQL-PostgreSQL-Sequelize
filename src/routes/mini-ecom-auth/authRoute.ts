import express from "express";
import {
  login,
  signup,
} from "../../controller/mini-ecom-user/miniEcomUserController";

const authRouter = express.Router();

// ecommerce signup route
authRouter.post("/signup", signup);

// ecommerce login route
authRouter.post("/login", login);

export default authRouter;
