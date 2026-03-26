import express from "express";
import {
  borrowBook,
  borrowedBookByUser,
  createBook,
  deleteBook,
  getBook,
  moreThanTWoBorrowedUsers,
  updateBook,
} from "../../controller/book/bookController";

export const bookRouter = express.Router();

// get book
bookRouter.get("/", getBook);

// create book
bookRouter.post("/", createBook);

// update book
bookRouter.put("/:id", updateBook);

// delete book
bookRouter.delete("/:id", deleteBook);

// borrow book
bookRouter.post("/borrow/:id", borrowBook);

// get books borrowed by a user id
bookRouter.get("/borrow/user/:id", borrowedBookByUser);

// users with more than 2 borrowed books.
bookRouter.get("/borrow-more-than-two", moreThanTWoBorrowedUsers);
