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
export const uploadVideo = (req: Request, res: Response): void => {
    upload.single("video")(req, res, async (err: any) => {

    if (err) {
      console.error("Upload Error:", err);
      return res.status(400).json({ msg: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }
    const userId = req.body.userId; 
    const title = req.body.title
    const description = req.body.description;
    const filename = req.file?.filename || '';
    const mimetype = req.file?.mimetype || '';
    const size = req.file?.size || 0;
    const thumbnail = ''; 
    const query = `
    INSERT INTO videos (user_id, title, description, filename, mimetype, size, thumbnail, created_at) 
    VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
  `;
  if (!userId || !title) {
    return res.status(400).json({ msg: "User ID and title are required" });
  }

  try{
    await pool.query(query,[userId,title,description,filename,mimetype,size,thumbnail])
    res.status(200).json({msg:"Video uploaded successfully", file:req.file})
  }catch(error){
    log(error)
     res.status(500).json({msg:"Server error"})
  }
  });
};
