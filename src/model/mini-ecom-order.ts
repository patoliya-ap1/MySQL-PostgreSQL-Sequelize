import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config";

export const MiniEcomOrderModel = sequelize.define(
  "MiniEcomOrder",
  {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    totalAmount: { type: DataTypes.FLOAT, allowNull: false },
  },
  {
    tableName: "miniecom-orders",
    indexes: [
      {
        fields: ["userId"],
      },
    ],
  },
);
