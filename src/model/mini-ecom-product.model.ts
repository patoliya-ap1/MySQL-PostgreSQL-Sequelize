import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config";

export const MiniEcomProductModel = sequelize.define(
  "MiniEcomProduct",
  {
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    metadata: { type: DataTypes.JSONB, allowNull: false },
  },
  {
    tableName: "miniecom-products",
  },
);
