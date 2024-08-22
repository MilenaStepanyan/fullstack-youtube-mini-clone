import { Request, Response } from "express";
import { Video } from "../models/video";
import { log } from "console";
import { upload } from "../middleware/uploadMiddleware";
import pool from "../db/pool";
export const getVideos = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { search, sort, random } = req.query;
    let sql = `SELECT * FROM videos`;
    let params: any[] = [];
    if (search) {
      sql += ` WHERE title LIKE ? OR description LIKE ?`;
      params.push(`%${search}%`, `%${search}%`);
    }
    if (sort) {
      const [column, order] = (sort as string).split(":");
      sql += ` ORDER BY ?? ${order.toUpperCase()}`;
      params.push(column);
    }
    if (random) {
      sql += `ORDER BY RAND()`;
    }
    const [rows] = (await pool.query(sql, params)) as [Video[], any];
    return res.json(rows);
  } catch (error) {
    log("error");
    return res.status(500).json({ msg: "Server error" });
  }
};