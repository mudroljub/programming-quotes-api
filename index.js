const express = require('express')
const mongodb = require('mongodb')
const http = require('http')
const cors = require('cors')
const bodyParser = require('body-parser')
const WebSocket = require('ws')

const mongoUri = 'mongodb://filmovi:filmovi@ds243285.mlab.com:43285/heroku_sljlvq37'
const port = process.env.PORT || 5000
const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

/* CONFIG */

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

wss.broadcast = data => {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) client.send(data)
  })
}

/* RUTE */

app.get('/', (req, res) => res.send('Baza filmova u izgradnji.'))

app.get('/filmovi/', (req, res) => {
  mongodb.MongoClient.connect(mongoUri, (err, db) => {
    if (err) throw err
    db.collection('filmovi')
      .find()
      .sort({godina: 1}) // ili padajuce -1
      .toArray((err, podaci) => res.send(podaci))
  })
})

app.post('/dodaj/', (req, res) => {
  const {naziv, godina, slika} = req.body
  if (!naziv || !godina || !slika) return res.send('Niste poslali sva polja.')
  mongodb.MongoClient.connect(mongoUri, (err, db) => {
    if(err) throw err
    db.collection('filmovi').update(
       {naziv},
       {$set: {godina, slika}},
       {upsert: true}
    )
    res.send('Hvala na azuriranju baze filmova.')
    wss.broadcast('Baze filmova je azurirana.')
  })
})

app.get('/obrisi/:id', (req, res) => {
    mongodb.MongoClient.connect(mongoUri, (err, db) => {
      db.collection('filmovi').deleteOne({ "_id": mongodb.ObjectID(req.params.id) })
      res.send(`Unos sa ID ${req.params.id} je obrisan.`)
    })
})

/* SERVER */

server.listen(port, () => console.log('Server sluzi na kapiji', port))
