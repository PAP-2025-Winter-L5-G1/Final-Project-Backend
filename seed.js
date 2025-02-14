const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./reddit.db')

db.run(`INSERT INTO community VALUES (
    2, "test", "this is the description"
    )`)