import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config";

export const AccountModel = sequelize.define(
  "Account",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    balance: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
  },
  {
    tableName: "accounts",
    timestamps: true,
    indexes: [
      {
        fields: ["userId"],
      },
    ],
  },
);
