const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./reddit.db')
/**
 * Use This file to add starting data to your database
 * 
 */
//how to add a community
db.run(`INSERT INTO community (communityName, communityDesc) VALUES (
         "Community1", "this is the description and its new"
        )`)