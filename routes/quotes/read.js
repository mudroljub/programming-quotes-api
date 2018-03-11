const mongodb = require('mongodb')
const mongoUri = require('../../config.js').mongoUri

module.exports = (req, res) => {
  mongodb.MongoClient.connect(mongoUri, (err, db) => {
    if (err) throw err
    db.collection('quotes')
      .find()
      .toArray((err, data) => res.send(data.sort(() => .5 - Math.random())))
  })
}
