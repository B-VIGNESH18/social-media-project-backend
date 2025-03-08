// commentRoutes.js
import express from "express";
import {
  createComment,
  getComments,
} from "../controllers/commentController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Route to create a new comment (requires authentication)
router.post("/", authMiddleware, createComment);

// Route to get comments for a specific post by postId
router.get("/:postId", getComments);

export default router;
