const mongodb = require('mongodb')
const mongoUri = require('../config/constants.js').mongoUri

const filmovi = (req, res) => {
  mongodb.MongoClient.connect(mongoUri, (err, db) => {
    if (err) throw err
    db.collection('filmovi')
      .find()
      .sort({godina: 1}) // ili padajuce -1
      .toArray((err, podaci) => res.send(podaci))
  })
}

module.exports = filmovi
