import express from "express";
import {
  getPosts,
  createPost,
  deletePost,
} from "../controllers/postController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", authMiddleware, upload.single("image"), createPost);
// Add DELETE route to handle deletion of posts
router.delete("/:id", authMiddleware, deletePost);

export default router;
