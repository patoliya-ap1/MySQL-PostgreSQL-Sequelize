// export default (sequelize, DataTypes) => {
//   return sequelize.define("Post", {
//     content: DataTypes.TEXT,
//     tags: DataTypes.ARRAY(DataTypes.STRING),
//     metadata: DataTypes.JSONB,
//   });
// };

import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config";

// social post model
export const SocialPostModel = sequelize.define(
  "Post",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    metadata: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
  },
  {
    tableName: "social-posts",
    timestamps: true,
  },
);
