const mongodb = require('mongodb')
const mongoUri = require('../../config.js').mongoUri
const lozinka = process.env.LOZINKA

module.exports = (req, res) => {
  const {_id, password} = req.body
  if (password !== lozinka) return res.send('Niste prijavljeni.')

  mongodb.MongoClient.connect(mongoUri, (err, db) => {
    db.collection('citati').deleteOne({'_id': new mongodb.ObjectId(_id)}, (err, obj) => {
      if (err) throw err
      if (obj.deletedCount) res.send('QUOTE_DELETED')
    })
  })
}
