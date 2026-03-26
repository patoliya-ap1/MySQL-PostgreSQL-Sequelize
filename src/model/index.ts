import { BookModel } from "./books.model";
import { BorrowedBookModel } from "./borrowed-book.model";
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

export { UserModel, BookModel, BorrowedBookModel };
