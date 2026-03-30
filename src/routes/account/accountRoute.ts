import express from "express";
import {
    addAmount,
  createUserAccount,
  deleteAccount,
  getAccount,
  transferMoney,
  updateAccount,
} from "../../controller/account/accountController";

export const accountRouter = express.Router();

// create accounts
accountRouter.post("/account", createUserAccount);

// get accounts
accountRouter.get("/account", getAccount);

// update accounts
accountRouter.put("/account/:id", updateAccount);

// delete accounts
accountRouter.delete("/account/:id", deleteAccount);

// add amount
accountRouter.put("/account/add/:id", addAmount);

// transfer amount
accountRouter.post("/account/transfer", transferMoney);
