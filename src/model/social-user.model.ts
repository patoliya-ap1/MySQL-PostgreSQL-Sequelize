// export default (sequelize, DataTypes) => {
//   return sequelize.define("User", {
//     name: DataTypes.STRING
//   });
// };

import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config";

// social user model
export const SocialUserModel = sequelize.define(
  "SocialUser",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
  },
  {
    tableName: "social-users",
    timestamps: true,
  },
);
