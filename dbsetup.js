const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./reddit.db')
db.serialize(()=> {
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
    db.run(`CREATE TABLE IF NOT EXISTS userInCommunity (
        memberId INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER,
        communityId INTEGER,
        FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE,
        FOREIGN KEY (communityId) REFERENCES community(communityId) ON DELETE CASCADE
        )`)
    db.run(`CREATE TABLE IF NOT EXISTS post (
        postId INTEGER PRIMARY KEY AUTOINCREMENT,
        communityId INTEGER,
        userId INTEGER,
        postContent TEXT,
        postDate INTEGER,
        FOREIGN KEY (communityId) REFERENCES community(communityId) ON DELETE CASCADE,
        FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE
        )`)
    db.run(`CREATE TABLE IF NOT EXISTS comment (
        commentId INTEGER PRIMARY KEY AUTOINCREMENT,
        postId INTEGER,
        userId INTEGER,
        commentContent TEXT,
        commentDate INTEGER,
        FOREIGN KEY (postId) REFERENCES post(postId) ON DELETE CASCADE,
        FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE
        )`)
        db.run(`CREATE TABLE IF NOT EXISTS likes (
            likeId INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER,
            postId INTEGER,
            commentId INTEGER,
            FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE,
            FOREIGN KEY (postId) REFERENCES post(postId) ON DELETE CASCADE,
            FOREIGN KEY (commentId) REFERENCES comment(commentId) ON DELETE CASCADE
        )`);
        
}) 

