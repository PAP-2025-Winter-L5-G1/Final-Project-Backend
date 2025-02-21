const db = require('../dbsetup'); 


const createUser = (userName, email, passwordHash, callback) => {
    const sql = "INSERT INTO users (userName, email, password) VALUES (?, ?, ?";
    db.run(sql, [userName, email, passwordHash], function (err) {
      if (err) return callback(err);
      callback(null, {userId: this.lastID, userName, email});
    });
};

const findUserByEmail = (email, callback) => {
  db.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
    callback(err, user);
  });
};


module.exports = { createUser, findUserByEmail };