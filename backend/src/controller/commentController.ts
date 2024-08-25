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
      const { video_id, user_id, content } = req.body;
  
      if (!video_id || !user_id || !content) {
        return res.status(400).json({ msg: "Missing required fields" });
      }
  
      const sql = `
        INSERT INTO comments (video_id, user_id, content, created_at) 
        VALUES (?, ?, ?, NOW())
      `;
      const params = [video_id, user_id, content];
  
      await pool.query(sql, params);
  
      return res.status(201).json({ msg: "Comment created successfully" });
    } catch (error) {
      console.error("Error creating comment:", error);
      return res.status(500).json({ msg: "Server error" });
    }
  };
  

export const updateComment = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const { comment_text } = req.body;

    if (!comment_text) {
      return res.status(400).json({ msg: "Comment text is required" });
    }

    const sql = `UPDATE comments SET comment_text = ? WHERE id = ?`;
    await pool.query(sql, [comment_text, id]);

    return res.json({ msg: "Comment updated successfully" });
  } catch (error) {
    console.error("Error updating comment:", error);
    return res.status(500).json({ msg: "Server error" });
  }
};

export const deleteComment = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;

    const sql = `DELETE FROM comments WHERE id = ?`;
    await pool.query(sql, [id]);

    return res.json({ msg: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return res.status(500).json({ msg: "Server error" });
  }
};
