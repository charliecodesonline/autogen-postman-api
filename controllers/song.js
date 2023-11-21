const SongService = require("../services/song.js");

class SongController {
    static getSongs = async(req, res) => {
        const songs = await SongService.getSongs();
        res.json(songs);
    }
}

module.exports = {
    SongController
}