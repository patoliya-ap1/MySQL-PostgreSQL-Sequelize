import { sequelize } from "../config/db.config";
import { OrderModel, ProductModel } from "../model/index";

export async function orderPlace(data: any) {
  const transaction = await sequelize.transaction();

  try {
    const product: any = await ProductModel.findByPk(data.productId, {
      transaction,
    });

    if (!product || product.stock <= 0) {
      throw new Error("Product out of stock");
    }

    if (product.stock < data.quantity) {
      throw new Error(
        `Product stock is ${product.stock} please change quantity`,
      );
    }

    const amount = product.price * data.quantity;

    const order = await OrderModel.create({ ...data, amount }, { transaction });

    product.stock -= data.quantity;
    await product.save({ transaction });

    await transaction.commit();
    return order;
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
}
