const db = require('../dbsetup'); 


const User = {
  // Function to create a new user
  createUser: (username, hashedPassword, email, callback) => {
    const sql = `INSERT INTO users (userName, password, email) VALUES (?, ?, ?)`;
    db.run(sql, [username, hashedPassword, email], function (err) {
      if (err) {
        return callback(err, null);
      }
      callback(null, this.lastID); // Returns the inserted user's ID
    });
  },

  // Function to find a user by username
  findUserByUsername: (username, callback) => {
    const sql = `SELECT * FROM users WHERE userName = ?`;
    db.get(sql, [username], (err, row) => {
      if (err || !row) {
        return callback(err || new Error('User not found'), null);
      }
      callback(null, row);
    });
  },
};

module.exports = User;