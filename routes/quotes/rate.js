const mongodb = require('mongodb')
const ObjectId = require('mongodb').ObjectId
const mongoUri = require('../../config.js').mongoUri

module.exports = (req, res) => {
  const _id = req.body._id
  const newRating = Number(req.body.newRating)
  if (!_id || !newRating) return res.send('ARGUMENTS_ERROR')

  mongodb.MongoClient.connect(mongoUri, (err, db) => {
    if(err) throw err

    db.collection('quotes').findOne({_id: new ObjectId(_id)}, (err, quote) => {
      if (err) throw err
      const {numberOfVotes, rating} = quote
      const newAverage = (numberOfVotes * rating + newRating) / (numberOfVotes + 1)
      db.collection('quotes').update(
        {_id: new ObjectId(_id)},
        {
          $set: {
            rating: newAverage.toFixed(1),
            numberOfVotes: numberOfVotes + 1
          }
        }
      )
      res.send(newAverage.toFixed(1))
      db.close()
    })
  })
}
