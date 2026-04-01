import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config";

export const MiniEcomUserModel = sequelize.define(
  "MiniEcomUser",
  {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: "miniecom-users",
  },
);
