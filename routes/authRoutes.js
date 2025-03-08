import express from "express";
import {
  registerUser,
  loginUser,
  getMe,
} from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js"; // ✅ Correct default import

const router = express.Router();

// Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", authMiddleware, getMe); // ✅ No duplicate declaration

export default router;
