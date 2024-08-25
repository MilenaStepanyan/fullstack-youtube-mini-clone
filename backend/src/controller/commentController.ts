import { Request, Response } from "express";
import pool from "../db/pool";

export const getComments = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { video_id } = req.query;

    if (!video_id) {
      return res.status(400).json({ msg: "Video ID is required" });
    }

    const sql = `SELECT * FROM comments WHERE video_id = ? ORDER BY created_at ASC`;
    const [rows] = await pool.query(sql, [video_id]);

    return res.json(rows);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return res.status(500).json({ msg: "Server error" });
  }
};

