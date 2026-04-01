import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.config';

export const MiniEcomOrderItemModel = sequelize.define('MiniEcomOrderItem', {
  orderId: DataTypes.INTEGER,
  productId: DataTypes.INTEGER,
  quantity: DataTypes.INTEGER,
  price: DataTypes.FLOAT
},{
    tableName: "miniecom-orderItems",
  });