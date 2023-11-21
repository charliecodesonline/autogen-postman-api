const path = require("path");
const sqlite3 = require("sqlite3");
let db = new sqlite3.Database(path.resolve(__dirname,'songs.db'), sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the songs database.');
});

module.exports = db;
