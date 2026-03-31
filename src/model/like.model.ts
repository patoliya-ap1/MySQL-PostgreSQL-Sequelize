import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config";

// social like model
export const SocialLikeModel = sequelize.define(
  "Post",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "social-likes",
    timestamps: true,
  },
);
