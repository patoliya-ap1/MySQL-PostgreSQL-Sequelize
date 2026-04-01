import { sequelize } from "../config/db.config";
import { MiniEcomOrderModel, MiniEcomOrderItemModel } from "../model/index";

interface ITEM {
  productId: number;
  quantity: number;
  price: number;
}

export const createOrder = async (userId: string, items: ITEM[]) => {
  const t = await sequelize.transaction();

  try {
    let total = 0;

    const order: any = await MiniEcomOrderModel.create(
      { userId, totalAmount: 0 },
      { transaction: t },
    );

    for (const item of items) {
      total += item.price * item.quantity;

      await MiniEcomOrderItemModel.create(
        {
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        },
        { transaction: t },
      );
    }

    order.totalAmount = total;
    await order.save({ transaction: t });

    await t.commit();
    return order;
  } catch (err) {
    await t.rollback();
    throw err;
  }
};
