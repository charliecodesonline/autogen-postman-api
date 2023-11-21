const express = require("express");
const router = express.Router();
const { SongController } = require("../controllers/song.js");

/** 
 * @typedef {Object} HTTPError
 * @param {string} message - the http error message
 */

/**
 * @typedef {Object} Song
 * @param   {string}    trackname - track name
 * @param   {string}    artistname - artist name
 * @param   {number}    artistcount - number of artists in track
 * @param   {string}    releasedyear - year of release
 * @param   {string}    releasedmonth - month of relase
 * @param   {string}    releasedday - day of release
 * @param   {string}    inspotifyplaylists - song is in spotify playlists
 * @param   {string}    inspotifycharts - song is in spotify charts
 * @param   {string}    streams - has streams
 * @param   {boolean}   inappleplaylists - song is in apple playlists
 * @param   {boolean}   inapplecharts - song is in apple charts
 * @param   {boolean}   indeezerplaylists - song is in deezer playlists
 * @param   {boolean}   indeezercharts - song is in deezer charts
 * @param   {boolean}   inshazamcharts - song is in shazam charts
 * @param   {number}    bpm - number of beats per minute
 * @param   {string}    key - song key
 * @param   {string}    mode - mode
 * @param   {number}    danceability - how danceable the song is in percent
 * @param   {number}    valence - song valance percent
 * @param   {number}    energy - how much of a banger it is in %
 * @param   {number}    acousticness - how acoustic it is in %
 * @param   {number}    instrumentalness - how much instrumental it contains in percent
 * @param   {number}    liveness - how live it sounds in percent
 * @param   {number}    speechiness - how much speech in percent
 */

/**
 * @author Charlie Benger-Stevenson
 * @description Gets a list of songs
 * @method GET
 * @name /api/songs
 * @route /api/songs
 * @contenttype application/json
 * @http200 {Song} {application/json}
 * @http401 {HTTPError} {application/json}
 * @http403 {HTTPError} {application/json}
 * @http500 {HTTPError} {application/json}
 * @example 
 * curl -X {server}/api/song
 */
router.get('/songs', SongController.getSongs);

module.exports = router;
