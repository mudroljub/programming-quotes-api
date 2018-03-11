const mongodb = require('mongodb')
const mongoUri = require('../../config.js').mongoUri
const ObjectId = require('mongodb').ObjectId
const lozinka = process.env.LOZINKA

module.exports = (req, res) => {
  const {_id, sr, author, source, en, password} = req.body
  const condition = (en || sr) && author
  if (!condition) return res.send('ARGUMENTS_ERROR')
  if (password !== lozinka) return res.send('LOGIN_REQUIRED')

  mongodb.MongoClient.connect(mongoUri, (err, db) => {
    if(err) throw err
    db.collection('quotes').update(
      {_id: new ObjectId(_id)},
      {$set: {sr, author, source, en}}
    )
    res.send('SUCCESS_SAVED')
  })
}
