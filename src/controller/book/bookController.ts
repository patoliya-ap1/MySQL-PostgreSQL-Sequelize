import { NextFunction, Request, Response } from "express";
import { BookModel, BorrowedBookModel, UserModel } from "../../model/index";
import { fn, col, where ,Op} from "sequelize";
/**
 * Fetches all books from the database.
 *
 * @async
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} Sends a JSON response with the list of books.
 */
export const getBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const books = await BookModel.findAll();
  res.status(200).json({
    success: true,
    message: "books fetched successfully.",
    books,
  });
};

/**
 * Creates a new book record in the database.
 *
 * @async
 * @param {Request} req - Express request object, expects book data in req.body.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} Sends a JSON response with the newly created book.
 */
export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const bookData = req.body;
  const newBook = await BookModel.create(bookData);
  res.status(200).json({
    success: true,
    message: "new book created successfully.",
    newBook,
  });
};

/**
 * Updates an existing book record identified by ID.
 *
 * @async
 * @param {Request} req - Express request object, expects book ID in req.params.id and update data in req.body.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} Sends a JSON response with the updated book.
 */
export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const bookId = req.params.id;
  const dataForUpdate = req.body;
  const [count, rows] = await BookModel.update(dataForUpdate, {
    where: { id: bookId },
    returning: true,
  });
  res.status(200).json({
    success: true,
    message: "book updated successfully.",
    updatedBook: rows[0],
  });
};

/**
 * Deletes a book record identified by ID.
 *
 * @async
 * @param {Request} req - Express request object, expects book ID in req.params.id.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} Sends a JSON response with the deleted book data.
 */
export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const bookId = req.params.id as string;
  const book = await BookModel.findByPk(bookId);
  if (bookId) {
  }
  const deletedBook = await BookModel.destroy({
    where: { id: bookId },
  });
  res.status(200).json({
    success: true,
    message: "book deleted successfully.",
    deletedBook: book,
  });
};

/**
 * Borrow a book by ID.
 *
 * @async
 * @param {Request} req - Express request object, expects book ID in req.params.id.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} Sends a JSON response with the borrowed-book.
 */
export const borrowBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const bookId = req.params.id as string;
  const { userId } = req.body;
  const borrowedBook = await BorrowedBookModel.create({ userId, bookId });
  res.status(200).json({
    success: true,
    message: "book borrowed successfully.",
    borrowedBook,
  });
};

/**
 * books borrowed by a userId
 *
 * @async
 * @param {Request} req - Express request object, expects user ID in req.params.id.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} Sends a JSON response user with the borrowed-book.
 */
export const borrowedBookByUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.params.id as string;
  const user = await UserModel.findByPk(userId, {
    include: {
      model: BookModel,
      through: { attributes: [] },
    },
  });

  res.status(200).json({
    success: true,
    message: "borrowed book fetched successfully.",
    books: (user as any)?.Books,
  });
};

/**
 * books borrowed by a userId
 *
 * @async
 * @param {Request} req - Express request object, expects user ID in req.params.id.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} Sends a JSON response user with more than two borrowed-book.
 */
export const moreThanTWoBorrowedUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const users = await UserModel.findAll({
    attributes: ["id", "name", [fn("COUNT", col("Books.id")), "bookCount"]],
    include: {
      model: BookModel,
      attributes: [],
      through: { attributes: [] },
    },
    group: ["User.id"],
    having:where(fn('COUNT', col('Books.id')), {
    [Op.gt]: 2
  })
  });

  res.status(200).json({
    success: true,
    message: "more than two borrowed book users fetched successfully.",
    users,
  });
};
