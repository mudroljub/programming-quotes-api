const express = require('express')
const mongodb = require('mongodb')
const http = require('http')
const cors = require('cors')
const bodyParser = require('body-parser')
const WebSocket = require('ws')

const filmovi = require('./rute/filmovi')
const dodajFilm = require('./rute/dodaj-film')

const mongoUri = 'mongodb://filmovi:filmovi@ds243285.mlab.com:43285/heroku_sljlvq37'
const port = process.env.PORT || 5000
const app = express()
const server = http.createServer(app)

const wss = new WebSocket.Server({server})

wss.broadcast = data => {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) client.send(data)
  })
}

/* CONFIG */

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

/* RUTE */

app.get('/', (req, res) => res.send('Baza podataka u izgradnji.'))

app.get('/filmovi/', filmovi)

app.post('/dodaj-film/', (req, res) => dodajFilm(req, res, wss))

app.get('/obrisi-film/:id', (req, res) => {
  mongodb.MongoClient.connect(mongoUri, (err, db) => {
    db.collection('filmovi').deleteOne({ '_id': mongodb.ObjectID(req.params.id) })
    res.send(`Unos sa ID ${req.params.id} je obrisan.`)
  })
})

/* SERVER */

server.listen(port, () => console.log('Server sluzi na kapiji', port))
