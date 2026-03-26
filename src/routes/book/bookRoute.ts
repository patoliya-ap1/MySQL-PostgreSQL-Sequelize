import express from "express";
import {
  createBook,
  deleteBook,
  getBook,
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
