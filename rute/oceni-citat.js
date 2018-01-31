const mongodb = require('mongodb')
const mongoUri = require('../config/constants.js').mongoUri

const oceniCitat = (req, res) => {
  const {_id, novaOcena} = req.body
  const uslov = (_id && novaOcena)
  if (!uslov) return res.send('Niste poslali obavezna polja.')
  const ocena = novaOcena // implementirati logiku
  // naci citati
  // videti broj glasova

  mongodb.MongoClient.connect(mongoUri, (err, db) => {
    if(err) throw err
    db.collection('citati').update(
      {_id},
      {$set: {ocena}}
    )
    res.send('Hvala na azuriranju baze citata.')
  })
}

module.exports = oceniCitat
