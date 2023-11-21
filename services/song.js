const db = require("../db/db.js");

class SongService {

    static getSongs = async () => {
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM songs`;
            db.all(sql, [], (err, rows) => {
                if(err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    }

}

module.exports = SongService;