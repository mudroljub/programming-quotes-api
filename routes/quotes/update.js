const mongodb = require('mongodb')
const mongoUri = require('../../config.js').mongoUri
const ObjectId = require('mongodb').ObjectId
const lozinka = process.env.LOZINKA

module.exports = (req, res) => {
  const {_id, sr, autor, izvor, en, password} = req.body
  const uslov = (en || sr) && autor
  if (!uslov) return res.send('Niste poslali obavezna polja.')
  if (password !== lozinka) return res.send('Niste prijavljeni.')

  mongodb.MongoClient.connect(mongoUri, (err, db) => {
    if(err) throw err
    db.collection('citati').update(
      {_id: new ObjectId(_id)},
      {$set: {sr, autor, izvor, en}}
    )
    res.send('SUCCESS_SAVED')
  })
}
