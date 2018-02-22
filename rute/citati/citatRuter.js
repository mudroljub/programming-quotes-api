'use strict';

const express = require('express');
const router = express.Router({mergeParams: true});
const http = require('http');
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({server});

// kontroleri
const dodajCitat = require('./dodaj');
const azurirajCitat = require('./azuriraj');
const oceniCitat = require('./oceni');
const obrisiCitat = require('./obrisi');

// rute ispod
router.post('/dodaj-citat/', (req, res) => {
  dodajCitat(req, res, wss);
});

router.post('/azuriraj-citat/', (req, res) => {
  azurirajCitat;
});

router.post('/oceni-citat/', (req, res) => {
  oceniCitat;
});

router.post('/obrisi-citat/', (req, res) => {
  obrisiCitat;
});

module.exports = router;
