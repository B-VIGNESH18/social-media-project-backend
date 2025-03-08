import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js"; // ✅ Use import, not require

const router = express.Router();

// User Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "Protected profile route", user: req.user });
});

export default router;
