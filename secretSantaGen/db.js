const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('secret_santa.db', (err) => {
    if (err) {
        console.error("Error opening database:", err.message);
    } else {
        console.log("Connected to SQLite database.");
    }
});

//Create tables
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS assignments (
            id TEXT PRIMARY KEY,
            data TEXT NOT NULL,
            clicked TEXT NOT NULL
        )
    `);
});

module.exports = db;