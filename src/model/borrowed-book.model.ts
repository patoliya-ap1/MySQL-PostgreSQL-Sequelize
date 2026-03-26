import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config";

// borrowed-book model
export const BorrowedBookModel = sequelize.define(
  "BorrowedBook",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "books",
        key: "id",
      },
    },
  },
  {
    tableName: "borrowed-books",
    timestamps: true,
  },
);
