import { sequelize } from "../config/db.config";
import { AccountModel } from "../model/index";

export async function processTransaction(data: any) {
  const transaction = await sequelize.transaction();
  const { senderId, receiverId, amount } = data;
  try {
    const sender: any = await AccountModel.findByPk(senderId, {
      transaction: transaction,
    });
    const receiver: any = await AccountModel.findByPk(receiverId, {
      transaction: transaction,
    });

    if (!sender || !receiver) {
      throw new Error("Account not found");
    }

    if (sender.balance < amount) {
      throw new Error("Insufficient balance");
    }

    sender.balance -= amount;
    receiver.balance += amount;

    await sender.save({ transaction: transaction });
    await receiver.save({ transaction: transaction });

    await transaction.commit();
    return true;
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
}
