import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config";

export const MiniEcomOrderModel = sequelize.define(
  "MiniEcomOrder",
  {
    userId: DataTypes.INTEGER,
    totalAmount: DataTypes.FLOAT,
  },
  {
    tableName: "miniecom-orders",
  },
);
