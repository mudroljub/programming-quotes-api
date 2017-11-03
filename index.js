const express = require('express')
const mongodb = require('mongodb')
const cors = require('cors')
const bodyParser = require('body-parser')

const mongoUri = 'mongodb://filmovi:filmovi@ds243285.mlab.com:43285/heroku_sljlvq37'
const port = process.env.PORT
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

/* RUTE */

app.get('/', (req, res) => res.send(`Baza filmova u izgradnji.`))

app.get('/filmovi/', (req, res) => {
  mongodb.MongoClient.connect(mongoUri, (err, db) => {
    if (err) throw err
    db.collection('filmovi')
      .find()
      .sort({godina: 1}) // ili padajuce -1
      .toArray((err, podaci) => res.send(podaci))
    db.close()
  })
})

app.post('/dodaj/', (req, res) => {
  const {naziv, godina, slika} = req.body
  if (!naziv || !godina || !slika) return res.send('Niste poslali sva polja.')
  mongodb.MongoClient.connect(mongoUri, function(err, db) {
    if(err) throw err
    db.collection('filmovi').update(
       {naziv},
       {$set: {godina, slika}},
       {upsert: true} // insert ako treba
    )
    db.close()
    res.send('Hvala na azuriranju baze filmova.')
  })
})

/* SERVER */

app.listen(port, () => console.log(`Server sluzi na kapiji ${port}.`))
