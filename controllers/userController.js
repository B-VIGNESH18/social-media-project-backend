import db from "../config/db.js";

export const getUserProfile = (req, res) => {
  const userId = req.user.id;
  db.query(
    "SELECT id, username, email FROM users WHERE id = ?",
    [userId],
    (err, results) => {
      if (err || results.length === 0)
        return res.status(404).json({ error: "User not found" });
      res.json(results[0]);
    }
  );
};
