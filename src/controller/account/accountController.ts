import { sequelize } from "../../config/db.config";
import { AccountModel } from "../../model";
import { Request, Response } from "express";
import { literal } from "sequelize";
import { processTransaction } from "../../utils/createTransactionService";

/**
 * transfer amount.
 *
 * @async
 * @param {Request} req - Express request object, expects senderId, receiverId and amount in req.body.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} Sends a JSON response message transfer success or fail.
 */
export const transferMoney = async (req: Request, res: Response) => {
  const { senderId, receiverId, amount } = req.body;

  const t = await sequelize.transaction();

  try {
    const transfer = await processTransaction({ senderId, receiverId, amount });

    if (!transfer) {
      return res.status(200).json({
        success: true,
        message: "Transfer failed",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Transfer successful",
    });
  } catch (error: any) {
    await t.rollback();

    return res.status(400).json({
      success: true,
      error: error.message,
    });
  }
};

/**
 * Creates a new account in the database.
 *
 * @async
 * @param {Request} req - Express request object, expects userId and amount in req.body.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} Sends a JSON response with the newly created account.
 */
export const createUserAccount = async (req: Request, res: Response) => {
  const accountData = req.body;
  const newUserAccount = await AccountModel.create(accountData);
  res.status(201).json({
    success: true,
    message: "new account created successfully.",
  });
};

/**
 * Fetches all accounts from the database.
 *
 * @async
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} Sends a JSON response with the list of accounts.
 */
export const getAccount = async (req: Request, res: Response) => {
  const accounts = await AccountModel.findAll();
  res.status(200).json({
    success: true,
    message: "accounts fetched successfully.",
    accounts,
  });
};

/**
 * Updates an existing account identified by ID.
 *
 * @async
 * @param {Request} req - Express request object, expects account ID in req.params.id and update data in req.body.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} Sends a JSON response with the updated account.
 */
export const updateAccount = async (req: Request, res: Response) => {
  const accountId = req.params.id;
  const dataForUpdate = req.body;

  const [count, rows] = await AccountModel.update(dataForUpdate, {
    where: { id: accountId },
    returning: true,
  });

  res.status(200).json({
    success: true,
    message: "account updated successfully.",
    updatedAccount: rows[0],
  });
};

/**
 * Deletes account identified by ID.
 *
 * @async
 * @param {Request} req - Express request object, expects Account ID in req.params.id.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} Sends a JSON response with the deleted account data.
 */
export const deleteAccount = async (req: Request, res: Response) => {
  const accountId = req.params.id as string;
  const account = await AccountModel.findByPk(accountId);

  const deletedAccount = await AccountModel.destroy({
    where: { id: accountId },
  });
  res.status(200).json({
    success: true,
    message: "account deleted successfully.",
    deletedAccount: account,
  });
};

/**
 * Updates an existing account amount identified by ID.
 *
 * @async
 * @param {Request} req - Express request object, expects account ID in req.params.id and amount in req.body.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} Sends a JSON response with the updated account amount.
 */
export const addAmount = async (req: Request, res: Response) => {
  const accountId = req.params.id;
  const { amount } = req.body;

  const [count, rows] = await AccountModel.update(
    { balance: literal(`balance + ${amount}`) },
    {
      where: { id: accountId },
      returning: true,
    },
  );

  res.status(200).json({
    success: true,
    message: "amount added successfully.",
    updatedAccount: rows[0],
  });
};
