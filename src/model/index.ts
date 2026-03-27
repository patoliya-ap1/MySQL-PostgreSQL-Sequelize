import { BookModel } from "./books.model";
import { BorrowedBookModel } from "./borrowed-book.model";
import { EcomUserModel } from "./ecom-user.model";
import { OrderModel } from "./order.model";
import { ProductModel } from "./product.model";
import { UserModel } from "./user.model";

UserModel.belongsToMany(BookModel, {
  through: BorrowedBookModel,
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

BookModel.belongsToMany(UserModel, {
  through: BorrowedBookModel,
  foreignKey: "bookId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

EcomUserModel.hasMany(OrderModel, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
ProductModel.hasMany(OrderModel, {
  foreignKey: "productId",
  onDelete: "CASCADE",
});
OrderModel.belongsTo(EcomUserModel, { foreignKey: "userId" });
OrderModel.belongsTo(ProductModel, { foreignKey: "productId" });

export {
  UserModel,
  BookModel,
  BorrowedBookModel,
  EcomUserModel,
  ProductModel,
  OrderModel,
};
