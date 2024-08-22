import { Request, Response } from "express";
import express from "express";
import { getVideos, uploadVideo } from "../controller/videoController";
import { verifyToken } from "../middleware/authMiddleware";
const router = express.Router();

router.get("/getVideos",(req:Request,res:Response)=>getVideos(req,res))
router.post("/upload",verifyToken,(req:Request,res:Response)=>uploadVideo(req,res))
export default router