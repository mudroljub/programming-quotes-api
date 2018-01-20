const express = require('express')
const http = require('http')
const cors = require('cors')
const bodyParser = require('body-parser')
const WebSocket = require('ws')

const filmovi = require('./rute/filmovi')
const dodajFilm = require('./rute/dodaj-film')
const obrisiFilm = require('./rute/obrisi-film')

const citati = require('./rute/citati')
const dodajCitat = require('./rute/dodaj-citat')
const obrisiCitat = require('./rute/obrisi-citat')

const port = process.env.PORT || 5000
const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({server})

/* CONFIG */

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

/* RUTE */

app.get('/', (req, res) => res.send('Baza podataka u izgradnji.'))

app.get('/filmovi/', filmovi)

app.post('/dodaj-film/', (req, res) => dodajFilm(req, res, wss))

app.get('/obrisi-film/:id', obrisiFilm)

app.get('/citati/', citati)

app.post('/dodaj-citat/', (req, res) => dodajCitat(req, res, wss))

app.get('/obrisi-citat/:id', obrisiCitat)

/* SERVER */

server.listen(port, () => console.log('Služitelj sluzi na kapiji', port))
