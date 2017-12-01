const express = require('express')
const http = require('http')
const cors = require('cors')
const bodyParser = require('body-parser')

const filmovi = require('./rute/filmovi')
const dodajFilm = require('./rute/dodaj-film')
const obrisiFilm = require('./rute/obrisi-film')

const port = process.env.PORT || 5000
const app = express()
const server = http.createServer(app)

/* CONFIG */

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

/* RUTE */

app.get('/', (req, res) => res.send('Baza podataka u izgradnji.'))

app.get('/filmovi/', filmovi)
app.get('/obrisi-film/:id', obrisiFilm)
app.post('/dodaj-film/', (req, res) => dodajFilm(req, res, server))

/* SERVER */

server.listen(port, () => console.log('Server sluzi na kapiji', port))
