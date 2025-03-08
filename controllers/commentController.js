// commentController.js
import db from "../config/db.js";

export const getComments = (req, res) => {
  const postId = req.params.postId;
  const sql = `
    SELECT comments.*, users.username 
    FROM comments 
    JOIN users ON comments.user_id = users.id 
    WHERE comments.post_id = ? 
    ORDER BY comments.created_at ASC
  `;
  db.query(sql, [postId], (err, results) => {
    if (err) {
      console.error("Error fetching comments:", err);
      return res.status(500).json({ error: "Error fetching comments" });
    }
    res.json(results);
  });
};

export const createComment = (req, res) => {
  const { postId, content } = req.body;
  const userId = req.user.id;
  if (!postId || !content) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const sql =
    "INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)";
  db.query(sql, [postId, userId, content], (err, result) => {
    if (err) {
      console.error("Error creating comment:", err);
      return res.status(500).json({ error: "Error creating comment" });
    }
    res.status(201).json({
      id: result.insertId,
      postId,
      content,
      username: req.user.username,
      created_at: new Date(),
    });
  });
};
