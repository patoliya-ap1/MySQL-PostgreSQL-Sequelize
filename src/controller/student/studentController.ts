import { NextFunction, Request, Response } from "express";
import { StudentModel } from "../../model/student.model";

/**
 * Fetches all students from the database.
 *
 * @async
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} Sends a JSON response with the list of students.
 */
export const getStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const students = await StudentModel.findAll();
  res.status(200).json({
    success: true,
    message: "students fetched successfully.",
    students,
  });
};

/**
 * Creates a new student record in the database.
 *
 * @async
 * @param {Request} req - Express request object, expects student data in req.body.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} Sends a JSON response with the newly created student.
 */
export const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const studentData = req.body;
  const newStudent = await StudentModel.create(studentData);
  res.status(200).json({
    success: true,
    message: "new student created successfully.",
    newStudent,
  });
};

/**
 * Updates an existing student record identified by ID.
 *
 * @async
 * @param {Request} req - Express request object, expects student ID in req.params.id and update data in req.body.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} Sends a JSON response with the updated student.
 */
export const updateStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const studentId = req.params.id;
  const dataForUpdate = req.body;
  const [count, rows] = await StudentModel.update(dataForUpdate, {
    where: { id: studentId },
    returning: true,
  });
  res.status(200).json({
    success: true,
    message: "student updated successfully.",
    updatedStudent: rows[0],
  });
};

/**
 * Deletes a student record identified by ID.
 *
 * @async
 * @param {Request} req - Express request object, expects student ID in req.params.id.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} Sends a JSON response with the deleted student data.
 */
export const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const studentId = req.params.id as string;
  const student = await StudentModel.findByPk(studentId);
  if (student) {
  }
  const deletedStudent = await StudentModel.destroy({
    where: { id: studentId },
  });
  res.status(200).json({
    success: true,
    message: "student deleted successfully.",
    deletedStudent: student,
  });
};
