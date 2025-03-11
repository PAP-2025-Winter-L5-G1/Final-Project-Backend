const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./reddit.db");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
        userId INTEGER PRIMARY KEY AUTOINCREMENT, 
        userName TEXT,
        password TEXT,
        email TEXT
        )`);
  db.run(`CREATE TABLE IF NOT EXISTS community (
        communityId INTEGER PRIMARY KEY AUTOINCREMENT,
        communityName TEXT,
        communityDesc TEXT
        )`);
  db.run(`CREATE TABLE IF NOT EXISTS likes (
        likeId INTEGER PRIMARY KEY AUTOINCREMENT,
        postId INTEGER,
        commentId INTEGER,
        userId INTEGER
        )`);
  db.run(`CREATE TABLE IF NOT EXISTS post (
        postId INTEGER PRIMARY KEY AUTOINCREMENT,
        communityId INTEGER,
        userId INTEGER,
        postContent TEXT,
        postCreator TEXT,
        postHeader TEXT,
        postDate INTEGER,
        FOREIGN KEY (communityId) REFERENCES community(communityId) ON DELETE CASCADE,
        FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE
        )`);
  db.run(`CREATE TABLE IF NOT EXISTS comment (
        commentId INTEGER PRIMARY KEY AUTOINCREMENT,
        postId INTEGER,
        userId INTEGER,
        commentContent TEXT,
        commentCreator TEXT,
        commentDate INTEGER,
        FOREIGN KEY (postId) REFERENCES post(postId) ON DELETE CASCADE,
        FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE
        )`);
  db.run(
    `INSERT INTO community (communityName, communityDesc)
    SELECT "Gaming", ""
    WHERE NOT EXISTS (SELECT 1 FROM community WHERE communityName = "Gaming")`
  );
  db.run(
    `INSERT INTO community (communityName, communityDesc)
    SELECT "Sports", ""
    WHERE NOT EXISTS (SELECT 1 FROM community WHERE communityName = "Sports")`
  );
  db.run(
    `INSERT INTO community (communityName, communityDesc)
    SELECT "Arts/Crafts", ""
    WHERE NOT EXISTS (SELECT 1 FROM community WHERE communityName = "Arts/Crafts")`
  );
  //   db.all("SELECT * FROM post", (err, rows) => {
  //     if (err) {
  //       console.error("Error selecting data:", err);
  //     } else {
  //       console.table(rows);
  //     }
  //   });
});

module.exports = db;
