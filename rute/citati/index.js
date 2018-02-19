const mongodb = require('mongodb')
const mongoUri = require('../../config.js').mongoUri

const citati = (req, res) => {
  mongodb.MongoClient.connect(mongoUri, (err, db) => {
    if (err) throw err
    db.collection('citati')
      .find()
      .toArray((err, podaci) => res.send(podaci.sort(() => .5 - Math.random())))
  })
}

module.exports = citati
