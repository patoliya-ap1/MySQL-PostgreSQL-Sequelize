import { sequelize } from "../../config/db.config";
import { AccountModel } from "../../model";
import { Request, Response } from "express";

export const transferMoney = async (req: Request, res: Response) => {
  const { senderId, receiverId, amount } = req.body;

  const t = await sequelize.transaction();

  try {
    const sender: any = await AccountModel.findByPk(senderId, {
      transaction: t,
    });
    const receiver: any = await AccountModel.findByPk(receiverId, {
      transaction: t,
    });

    if (!sender || !receiver) {
      throw new Error("Account not found");
    }

    if (sender.balance < amount) {
      throw new Error("Insufficient balance");
    }

    sender.balance -= amount;
    receiver.balance += amount;

    await sender.save({ transaction: t });
    await receiver.save({ transaction: t });

    await t.commit();

    return res.json({
      message: "Transfer successful",
    });
  } catch (error: any) {
    await t.rollback();

    return res.status(400).json({
      error: error.message,
    });
  }
};
