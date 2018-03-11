const mongodb = require('mongodb')
const mongoUri = require('../../config.js').mongoUri
const lozinka = process.env.LOZINKA

module.exports = (req, res) => {
  const {sr, author, source, en, password} = req.body
  const condition = (en || sr) && author
  if (!condition) return res.send('ARGUMENTS_ERROR')
  if (password !== lozinka) return res.send('LOGIN_REQUIRED')

  mongodb.MongoClient.connect(mongoUri, (err, db) => {
    if(err) throw err
    db.collection('quotes').insert(
      {sr, author, source, en, rating: 0, numberOfVotes: 0}
    )
    res.send('SUCCESS_SAVED')
  })
}
