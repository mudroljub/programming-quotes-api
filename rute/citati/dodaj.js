const mongodb = require('mongodb')
const mongoUri = require('../../config.js').mongoUri
const lozinka = process.env.LOZINKA

const dodajCitat = (req, res) => {
  const {sr, autor, izvor, en, password} = req.body
  const uslov = (en || sr) && autor
  if (!uslov) return res.send('ARGUMENTS_ERROR')
  if (password !== lozinka) return res.send('Niste prijavljeni.')

  mongodb.MongoClient.connect(mongoUri, (err, db) => {
    if(err) throw err
    db.collection('citati').insert(
      {sr, autor, izvor, en, ocena: 0, glasalo: 0}
    )
    res.send('SUCCESS_SAVED')
  })
}

module.exports = dodajCitat
