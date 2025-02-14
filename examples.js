const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./reddit.db')



//use db.all for select statements
db.all(`SELECT * FROM community`, (err, rows) => {
    if (err) {
        return console.error(err.message);
    }
    console.log("Communities:", rows);
});