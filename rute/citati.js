const mongodb = require('mongodb')
const mongoUri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds243285.mlab.com:43285/${process.env.DB_USER}`

const citati = (req, res) => {
  mongodb.MongoClient.connect(mongoUri, (err, db) => {
    if (err) throw err
    db.collection('citati')
      .find()
      .toArray((err, podaci) => res.send(podaci))
  })
}

module.exports = citati
