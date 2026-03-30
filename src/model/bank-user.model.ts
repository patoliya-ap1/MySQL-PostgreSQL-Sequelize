import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config";
import bcrypt from "bcryptjs";

export const BankUserModel = sequelize.define(
  "BankUser",
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
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "bank_users",
    timestamps: true,
    hooks: {
      beforeCreate: async (user: any) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      },
    },
  },
);
