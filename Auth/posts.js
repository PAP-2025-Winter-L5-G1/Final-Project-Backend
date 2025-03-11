const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./reddit.db");

/**
 * CREATE: Add a new post
 */
function createPost(
  communityId,
  userId,
  postContent,
  postCreator,
  postHeader,
  postDate
) {
  const sql = `INSERT INTO post (communityId, userId, postContent, postCreator, postHeader, postDate) VALUES (?, ?, ?, ?, ?, ?)`;
  db.run(
    sql,
    [communityId, userId, postContent, postCreator, postHeader, postDate],
    function (err) {
      if (err) return console.log(err);
      console.log("post created");
    }
  );
}

/**
 * READ: Get all posts or filter by community
 */

function getPosts(communityId) {
  return new Promise((resolve, reject) => {
    const sql = communityId
      ? `SELECT * FROM post JOIN users ON post.userId = users.userId WHERE communityId = ? ORDER BY postDate DESC`
      : `SELECT * FROM post ORDER BY postDate DESC`;
    db.all(sql, communityId ? [communityId] : [], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}
/**
 * READ: Get a single post by ID
 */
function getPostById(postId) {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM post WHERE postId = ?`;
    db.get(sql, [postId], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

/**
 * UPDATE: Edit a post's content
 */
function updatePost(postId, newContent) {
  const sql = `UPDATE post SET postContent = ? WHERE postId = ?`;
  db.run(sql, [newContent, postId], function (err) {
    if (err) return console.log(err);
    return "Post updated successfully";
  });
}

/**
 * DELETE: Remove a post
 */
function deletePost(postId) {
  const sql = `DELETE FROM post WHERE postId = ?`;
  db.run(sql, [postId], function (err) {
    if (err) return console.log(err);
    return "Post deleted successfully";
  });
  3;
}

// ✅ Export functions
module.exports = { createPost, getPosts, getPostById, updatePost, deletePost };
