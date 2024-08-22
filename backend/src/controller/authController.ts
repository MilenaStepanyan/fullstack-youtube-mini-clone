import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../db/pool";
import { User } from "../models/user";
import { RowDataPacket } from "mysql2";

const secret = process.env.JWT_SECRET;
if (!secret) {
  throw new Error("Secret Key Required");
}

export const registerUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ msg: "Missing required fields" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      `INSERT INTO users (username,email,password) VALUES (?, ?, ?)`,
      [username, email, hashedPassword]
    );
    return res.status(200).json({ msg: "User registered successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

export const loginUser = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { username, password } = req.body;
  
      if (!username || !password) {
        return res.status(400).json({ msg: "Missing required fields" });
      }
      const [rows]: [RowDataPacket[], any] = await pool.query(
        `SELECT * FROM users WHERE username = ? `,
        [username]
      );
      if (rows.length === 0) {
        return res.status(404).json({ msg: "User does not exist" });
      }
      const user: User = rows[0] as User;
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Wrong password" });
      }
      const token = jwt.sign({ userId: user.id }, secret, { expiresIn: "1h" });
      console.log(user);
  
      return res.json({ token });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Server error" });
    }
  };
  //req: Request, res: Response
  //:Promise<Response>
  //[rows]:[RowDataPacket[],any]
  //  const user: User = rows[0] as User;
  