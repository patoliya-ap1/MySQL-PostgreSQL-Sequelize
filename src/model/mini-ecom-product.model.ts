import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.config';

export const MiniEcomProductModel = sequelize.define('MiniEcomProduct', {
  name: DataTypes.STRING,
  price: DataTypes.FLOAT,
  metadata: DataTypes.JSONB
},{
    tableName: "miniecom-products",
  });