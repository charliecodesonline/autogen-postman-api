const SongRouter = require('./songs.js');
const express = require("express");
const router = express.Router();

router.use('/api', SongRouter);

module.exports = router;

