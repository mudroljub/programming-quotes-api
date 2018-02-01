const mongodb = require('mongodb')
const ObjectId = require('mongodb').ObjectId
const mongoUri = require('../config/constants.js').mongoUri

const oceniCitat = (req, res) => {
  const {_id, novaOcena} = req.body
  const uslov = (_id && novaOcena)
  if (!uslov) return res.send('Niste poslali obavezna polja.')

  mongodb.MongoClient.connect(mongoUri, (err, db) => {
    if(err) throw err
    db.collection('citati').findOne({_id: new ObjectId(_id)}, (err, citat) => {
      if (err) throw err
      const {glasalo, ocena} = citat
      res.send(`glasalo: ${glasalo}, ocena: ${ocena}, novaOcena: ${novaOcena}`)
      const noviProsek = (glasalo * ocena + novaOcena) / (glasalo + 1)
      // res.send(`glasalo: ${glasalo}, ocena: ${ocena}, novaOcena: ${novaOcena}`)
      db.collection('citati').update(
        {_id: new ObjectId(_id)},
        {$set: {ocena: noviProsek, glasalo: glasalo + 1}}
      )
      // res.send('noviProsek: ' + noviProsek)
      db.close()
    })
  })
}

module.exports = oceniCitat
