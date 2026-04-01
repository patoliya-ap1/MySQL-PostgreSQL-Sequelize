import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config";

export const MiniEcomUserModel = sequelize.define(
  "User",
  {
    name: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
  },
  {
    tableName: "miniecom-users",
  },
);
