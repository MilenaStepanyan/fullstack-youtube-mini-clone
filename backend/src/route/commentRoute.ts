import express from "express";
import {
  getComments,
  createComment,
  updateComment,
  deleteComment,
} from "../controller/commentController";

const router = express.Router();

router.get("/comments", getComments);
router.post("/comments", createComment);
router.put("/comments/:id", updateComment);
router.delete("/comments/:id", deleteComment);

export default router;
