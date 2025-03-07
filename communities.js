const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./reddit.db');

//get all communities
function getAllCommunities(callback) {
    const sql = `SELECT * FROM community ORDER BY communityName ASC`; // Adjust table name if needed
    db.all(sql, [], (err, rows) => {
        if (err) return callback(err, null);
        callback(null, rows);
    });
}

// Export the function
module.exports = { getAllCommunities };
