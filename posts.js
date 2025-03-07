const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./reddit.db');

/**
 * CREATE: Add a new post
 */
function createPost(communityId, userId, postContent, postDate, callback) {
    const sql = `INSERT INTO post (communityId, userId, postContent, postDate) VALUES (?, ?, ?, ?)`;
    db.run(sql, [communityId, userId, postContent, postDate], function (err) {
        if (err) return callback(err, null);
        callback(null, { postId: this.lastID, message: "Post created successfully" });
    });
}

/**
 * READ: Get all posts or filter by community
 */
function getPosts(communityId, callback) {
    const sql = communityId 
        ? `SELECT * FROM post WHERE communityId = ? ORDER BY postDate DESC`
        : `SELECT * FROM post ORDER BY postDate DESC`;

    db.all(sql, communityId ? [communityId] : [], (err, rows) => {
        if (err) return callback(err, null);
        callback(null, rows);
    });
}

/**
 * READ: Get a single post by ID
 */
function getPostById(postId, callback) {
    const sql = `SELECT * FROM post WHERE postId = ?`;
    db.get(sql, [postId], (err, row) => {
        if (err) return callback(err, null);
        callback(null, row);
    });
}

/**
 * UPDATE: Edit a post's content
 */
function updatePost(postId, newContent, callback) {
    const sql = `UPDATE post SET postContent = ? WHERE postId = ?`;
    db.run(sql, [newContent, postId], function (err) {
        if (err) return callback(err, null);
        callback(null, { message: "Post updated successfully" });
    });
}

/**
 * DELETE: Remove a post
 */
function deletePost(postId, callback) {
    const sql = `DELETE FROM post WHERE postId = ?`;
    db.run(sql, [postId], function (err) {
        if (err) return callback(err, null);
        callback(null, { message: "Post deleted successfully" });
    });
}

// ✅ Export functions
module.exports = { createPost, getPosts, getPostById, updatePost, deletePost };

