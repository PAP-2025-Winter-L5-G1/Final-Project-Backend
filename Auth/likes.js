const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./reddit.db");

/**
 * Function to like/unlike a post or comment (toggle like)
 */
function toggleLike(userId, postId = null) {
  if (!userId || !postId) {
    return Promise.reject(new Error("Invalid like request"));
  }

  return new Promise((resolve, reject) => {
    const selectSql = `SELECT * FROM likes WHERE userId = ? AND postId IS ?`;

    db.get(selectSql, [userId, postId], (err, row) => {
      if (err) return reject(err);

      if (row) {
        // Unlike
        const deleteSql = `DELETE FROM likes WHERE likeId = ?`;
        db.run(deleteSql, [row.likeId], function (err) {
          if (err) return reject(err);
          resolve({ message: "Like removed", liked: false });
        });
      } else {
        // Like
        const insertSql = `INSERT INTO likes (userId, postId) VALUES (?, ?)`;
        db.run(insertSql, [userId, postId], function (err) {
          if (err) return reject(err);
          resolve({ message: "Like added", liked: true });
        });
      }
    });
  });
}

/**
 * Function to get like count for a post or comment
 */
function countLikes(postId = null) {
  return new Promise((resolve, reject) => {
    const sql = `SELECT COUNT(*) AS likeCount FROM likes WHERE postId IS ?`;
    db.get(sql, [postId], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

function likeStatus(userId, postId) {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM likes WHERE userId = ? AND postId = ?`;
    db.get(sql, [userId, postId], (err, row) => {
      if (err) return reject(err);
      resolve(!!row); //return true if liked previously by user, false if not liked previously by user
    });
  });
}
module.exports = { toggleLike, countLikes, likeStatus };
