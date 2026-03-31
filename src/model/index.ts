import { AccountModel } from "./account.model";
import { BankUserModel } from "./bank-user.model";
import { BookModel } from "./books.model";
import { BorrowedBookModel } from "./borrowed-book.model";
import { EcomUserModel } from "./ecom-user.model";
import { SocialLikeModel } from "./like.model";
import { OrderModel } from "./order.model";
import { SocialPostModel } from "./post.model";
import { ProductModel } from "./product.model";
import { SocialUserModel } from "./social-user.model";
import { UserModel } from "./user.model";

// library association

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

// ecommerce association

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

// bank association

BankUserModel.hasOne(AccountModel, { foreignKey: "userId" });
AccountModel.belongsTo(BankUserModel, { foreignKey: "userId" });

// social medial association

SocialUserModel.hasMany(SocialPostModel, { foreignKey: "userId" });
SocialPostModel.belongsTo(SocialUserModel, { foreignKey: "userId" });

SocialPostModel.hasMany(SocialLikeModel, { foreignKey: "postId" });
SocialLikeModel.belongsTo(SocialPostModel, { foreignKey: "postId" });

SocialUserModel.hasMany(SocialLikeModel, { foreignKey: "userId" });
SocialLikeModel.belongsTo(SocialUserModel, { foreignKey: "userId" });

export {
  UserModel,
  BookModel,
  BorrowedBookModel,
  EcomUserModel,
  ProductModel,
  OrderModel,
  BankUserModel,
  AccountModel,
  SocialLikeModel,
  SocialPostModel,
  SocialUserModel,
};
