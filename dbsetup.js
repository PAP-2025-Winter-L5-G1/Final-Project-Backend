const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./reddit.db')
db.serialize(()=> {
    db.run(`CREATE TABLE IF NOT EXISTS users (userId INTEGER PRIMARY KEY AUTOINCREMENT, 
        userName TEXT,
        password TEXT,
        email TEXT
        )`); 
}) 