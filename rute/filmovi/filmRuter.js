'use strict';

const express = require('express');
const router = express.Router({mergeParams: true});
const http = require('http');
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({server});


const dodajFilm = require('./dodaj');
const obrisiFilm = require('./obrisi');
// rute ispod
router.post('/dodaj-film', (req, res) => {
  dodajFilm(req, res, wss);
});

router.get('/obrisi-film/:id', (req, res) => {
  obrisiFilm;
});

module.exports = router;
