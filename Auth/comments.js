const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./reddit.db");

// CREATE: createComment
// GET: getCommentsByPost, getCommentsByUser
// UPDATE: updateComment
// DELETE: deleteComment

function createComment(
  postId,
  userId,
  commentContent,
  commentCreator,
  commentDate
) {
  const sql = `INSERT INTO comment (postId, userId, commentContent, commentCreator, commentDate) VALUES (?, ?, ?, ?, ?)`;
  db.run(
    sql,
    [postId, userId, commentContent, commentCreator, commentDate],
    (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("comment created");
    }
  );
}

function getCommentsByPost(postId) {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM comment WHERE postId = ? ORDER BY commentDate DESC`;
    db.all(sql, [postId], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

function getCommentsByUser(userId) {
  const sql = `SELECT * FROM comment WHERE userId = ? ORDER BY commentDate DESC`;
  db.all(sql, [userId], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
  });
}

function updateComment(commentId, newCommentContent) {
  const sql = `UPDATE comment SET commentContent = ? WHERE commentId = ?`;
  db.run(sql, [newCommentContent, commentId], (err) => {
    if (err) {
      return console.error(err.message);
    }
  });
}

function deleteComment(commentId) {
  const sql = `DELETE FROM comment WHERE commentId = ?`;
  db.run(sql, [commentId], (err) => {
    if (err) {
      return console.error(err.message);
    }
  });
}

module.exports = {
  createComment,
  getCommentsByPost,
  getCommentsByUser,
  updateComment,
  deleteComment,
};
