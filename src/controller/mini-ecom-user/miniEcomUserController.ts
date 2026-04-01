import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { MiniEcomUserModel } from "../../model/index";

export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const user = await MiniEcomUserModel.create({ name, email, password: hash });

  res
    .status(201)
    .json({ status: true, message: "user signup successfully.", user });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user: any = await MiniEcomUserModel.findOne({ where: { email } });

  if (!user) return res.status(404).json({ message: "User not found" });

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) return res.status(401).json({ message: "Invalid password" });

  const token = jwt.sign({ id: user.id }, "secret");

  res.status(200).json({ success: true, message: "login success", token });
};
