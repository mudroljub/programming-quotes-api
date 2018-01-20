const mongodb = require('mongodb')
const mongoUri = process.env.MONGODB_URI
const WebSocket = require('ws')

const dodajCitat = (req, res, wss) => {
  const {sr, autor, izvor, en, ocena, brojGlasova} = req.body
  if (!sr || !autor) return res.send('Niste poslali obavezna polja.')
  mongodb.MongoClient.connect(mongoUri, (err, db) => {
    if(err) throw err
    db.collection('citati').update(
       {sr},
       {$set: {autor, izvor, en, ocena, brojGlasova}},
       {upsert: true}
    )
    res.send('Hvala na azuriranju baze citata.')
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) client.send('Baze citata je azurirana.')
    })
  })
}

module.exports = dodajCitat
