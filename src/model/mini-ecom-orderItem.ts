import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config";

export const MiniEcomOrderItemModel = sequelize.define(
  "MiniEcomOrderItem",
  {
    orderId: { type: DataTypes.INTEGER, allowNull: false },
    productId: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
  },
  {
    tableName: "miniecom-orderItems",
  },
);
