const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./reddit.db');

/**
 * Function to like/unlike a post or comment (toggle like)
 */
function toggleLike(userId, postId = null, commentId = null, callback) {
    if (!userId || (!postId && !commentId)) {
        return callback(new Error("Invalid like request"), null);
    }

    const checkSql = `SELECT * FROM likes WHERE userId = ? AND postId IS ? AND commentId IS ?`;
    db.get(checkSql, [userId, postId, commentId], (err, row) => {
        if (err) return callback(err, null);

        if (row) {
            // If like exists, remove it (unlike)
            const deleteSql = `DELETE FROM likes WHERE likeId = ?`;
            db.run(deleteSql, [row.likeId], function (err) {
                if (err) return callback(err, null);
                callback(null, { message: "Like removed" });
            });
        } else {
            // If no like exists, add a new like
            const insertSql = `INSERT INTO likes (userId, postId, commentId) VALUES (?, ?, ?)`;
            db.run(insertSql, [userId, postId, commentId], function (err) {
                if (err) return callback(err, null);
                callback(null, { message: "Like added" });
            });
        }
    });
}

/**
 * Function to get like count for a post or comment
 */
function countLikes(postId = null, commentId = null, callback) {
    const sql = `SELECT COUNT(*) AS likeCount FROM likes WHERE postId IS ? AND commentId IS ?`;
    db.get(sql, [postId, commentId], (err, row) => {
        if (err) return callback(err, null);
        callback(null, row.likeCount);
    });
}

module.exports = { toggleLike, countLikes };
