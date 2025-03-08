import db from "../config/db.js";

// Get all posts
export const getPosts = (req, res) => {
  db.query("SELECT * FROM posts ORDER BY created_at DESC", (err, results) => {
    if (err) {
      console.error("Database error fetching posts:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
};

// Create a new post
export const createPost = async (req, res) => {
  try {
    // Retrieve the user ID from the token (set by authMiddleware)
    const userId = req.user?.id;
    const { content } = req.body;
    // If a file is uploaded, set its URL relative to the uploads folder
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    // Validate required fields: userId, content, and imageUrl are required
    if (!userId || !content || !imageUrl) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const sql =
      "INSERT INTO posts (user_id, content, image_url) VALUES (?, ?, ?)";
    db.query(sql, [userId, content, imageUrl], (err, result) => {
      if (err) {
        console.error("Database error during post creation:", err);
        return res.status(500).json({ error: "Error creating post" });
      }
      res
        .status(201)
        .json({ message: "Post created", postId: result.insertId, imageUrl });
    });
  } catch (error) {
    console.error("Unexpected error in createPost:", error);
    res.status(500).json({ error: "Error creating post" });
  }
};

// Delete a post by its ID
export const deletePost = (req, res) => {
  const postId = req.params.id;
  const sql = "DELETE FROM posts WHERE id = ?";

  db.query(sql, [postId], (err, result) => {
    if (err) {
      console.error("Database error deleting post:", err);
      return res.status(500).json({ error: "Error deleting post" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json({ message: "Post deleted successfully" });
  });
};
