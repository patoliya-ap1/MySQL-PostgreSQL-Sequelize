import { NextFunction, Request, Response } from "express";
import { ProductModel } from "../../model/index";

/**
 * Fetches all products from the database.
 *
 * @async
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} Sends a JSON response with the list of products.
 */
export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const limit = 5;
  const page = parseInt(req.query.page as string) || 1;
  const offset = (page - 1) * limit;
  const { count, rows } = await ProductModel.findAndCountAll({
    limit: limit,
    offset: offset,
    order: [["createdAt", "DESC"]],
  });
  res.status(200).json({
    success: true,
    totalItems: count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    message: "products fetched successfully.",
    products: rows,
  });
};

/**
 * Creates a new product record in the database.
 *
 * @async
 * @param {Request} req - Express request object, expects product data in req.body.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} Sends a JSON response with the newly created product.
 */
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const productData = req.body;
  const newProduct = await ProductModel.create(productData);
  res.status(200).json({
    success: true,
    message: "new product created successfully.",
    newProduct,
  });
};

/**
 * Updates an existing product record identified by ID.
 *
 * @async
 * @param {Request} req - Express request object, expects product ID in req.params.id and update data in req.body.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} Sends a JSON response with the updated product.
 */
export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const productId = req.params.id;
  const dataForUpdate = req.body;
  const [count, rows] = await ProductModel.update(dataForUpdate, {
    where: { id: productId },
    returning: true,
  });
  res.status(200).json({
    success: true,
    message: "product updated successfully.",
    updatedProduct: rows[0],
  });
};

/**
 * Deletes a product record identified by ID.
 *
 * @async
 * @param {Request} req - Express request object, expects product ID in req.params.id.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} Sends a JSON response with the deleted product data.
 */
export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const productId = req.params.id as string;
  const product = await ProductModel.findByPk(productId);

  const deletedProduct = await ProductModel.destroy({
    where: { id: productId },
  });
  res.status(200).json({
    success: true,
    message: "product deleted successfully.",
    deletedProduct: product,
  });
};
