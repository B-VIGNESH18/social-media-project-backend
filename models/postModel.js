import pool from "../config/db.js";

export const createPost = async (userId, content, imageUrl) => {
  const [result] = await pool.query(
    "INSERT INTO posts (user_id, content, image_url) VALUES (?, ?, ?)",
    [userId, content, imageUrl]
  );
  return result;
};

export const getAllPosts = async () => {
  const [rows] = await pool.query(
    "SELECT posts.*, users.username FROM posts JOIN users ON posts.user_id = users.id ORDER BY posts.created_at DESC"
  );
  return rows;
};
