import { loginUser,registerUser } from "../controller/authController";
import { Request, Response } from "express";
import express from "express"

const router = express.Router()

router.post("/register",(req:Request,res:Response)=>registerUser(req,res))
router.post("/login",(req:Request,res:Response)=>loginUser(req,res))
export default router