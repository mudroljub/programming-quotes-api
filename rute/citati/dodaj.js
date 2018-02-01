const mongodb = require('mongodb')
const mongoUri = require('../../config.js').mongoUri
const WebSocket = require('ws')

const dodajCitat = (req, res, wss) => {
  const {sr, autor, izvor, en} = req.body
  const uslov = (en || sr) && autor
  if (!uslov) return res.send('Niste poslali obavezna polja.')

  mongodb.MongoClient.connect(mongoUri, (err, db) => {
    if(err) throw err
    db.collection('citati').insert(
      {sr, autor, izvor, en, ocena: 0, glasalo: 0}
    )
    res.send('Hvala na azuriranju baze citata.')
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) client.send('Baze citata je azurirana.')
    })
  })
}

module.exports = dodajCitat
