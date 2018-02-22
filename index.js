const express = require('express')
const http = require('http')
const cors = require('cors')
const bodyParser = require('body-parser')
const WebSocket = require('ws')

const ruter = require('./rute/ruter');

const filmovi = require('./rute/filmovi')
const dodajFilm = require('./rute/filmovi/dodaj')
const obrisiFilm = require('./rute/filmovi/obrisi')

const citati = require('./rute/citati')
const dodajCitat = require('./rute/citati/dodaj')
const azurirajCitat = require('./rute/citati/azuriraj')
const obrisiCitat = require('./rute/citati/obrisi')
const oceniCitat = require('./rute/citati/oceni')

const port = process.env.PORT || 5000
const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({server})

/* CONFIG */

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

/* RUTE */

app.get('/', (req, res) => res.send('Created by Filip Malek'));

app.get('/api', ruter);

// filmovi
// app.post('/dodaj-film/', (req, res) => dodajFilm(req, res, wss))
//
// app.get('/obrisi-film/:id', obrisiFilm)
//
// // citati
//
// app.get('/citati/', citati)
//
// app.post('/dodaj-citat/', (req, res) => dodajCitat(req, res, wss))
//
// app.post('/azuriraj-citat/', azurirajCitat)
//
// app.post('/oceni-citat/', oceniCitat)
//
// app.delete('/obrisi-citat/', obrisiCitat)

/* SERVER */

server.listen(port, () => console.log('Služitelj sluzi na kapiji', port))
