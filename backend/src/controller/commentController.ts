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

export const createComment = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { video_id, user_id, comment_text, parent_id } = req.body;

    if (!video_id || !user_id || !comment_text) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    const sql = `
      INSERT INTO comments (video_id, user_id, comment_text, parent_id, created_at) 
      VALUES (?, ?, ?, ?, NOW())
    `;
    const params = [video_id, user_id, comment_text, parent_id || null];

    await pool.query(sql, params);

    return res.status(201).json({ msg: "Comment created successfully" });
  } catch (error) {
    console.error("Error creating comment:", error);
    return res.status(500).json({ msg: "Server error" });
  }
};

