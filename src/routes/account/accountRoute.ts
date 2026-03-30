import express from "express";
import { transferMoney } from "../../controller/account/accountController";

export const accountRouter = express.Router();

accountRouter.post("/transfer", transferMoney);
