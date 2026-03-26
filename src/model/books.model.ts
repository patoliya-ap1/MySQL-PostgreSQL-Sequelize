import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config";

// book model
export const BookModel = sequelize.define(
  "Book",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "books",
    timestamps: true,
  },
);
