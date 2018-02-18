const mongodb = require('mongodb')
const mongoUri = require('../../config.js').mongoUri
const lozinka = process.env.LOZINKA

const obrisiCitat = (req, res) => {
  const {_id, password} = req.body
  if (password !== lozinka) return res.send('Niste prijavljeni.')

  mongodb.MongoClient.connect(mongoUri, (err, db) => {
    db.collection('citati').deleteOne({'_id': new mongodb.ObjectId(_id)})
    res.send(`Unos sa ID ${_id} je obrisan.`)
  })
}

module.exports = obrisiCitat
