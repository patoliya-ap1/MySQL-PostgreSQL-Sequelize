import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config";

export const EcomUserModel = sequelize.define(
  "EcomUser",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "ecom_users",
    timestamps: true,
  },
);
