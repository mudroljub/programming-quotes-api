const mongodb = require('mongodb')
const mongoUri = require('../config/constants.js').mongoUri
const lozinka = process.env.LOZINKA

const obrisiCitat = (req, res) => {
  // ako poslata lozinka nije ista kao LOZINKA return
  mongodb.MongoClient.connect(mongoUri, (err, db) => {
    db.collection('citati').deleteOne({'_id': new mongodb.ObjectID(req.body._id)})
    res.send(`Unos sa ID ${req.body._id} je obrisan.`)
  })
}

module.exports = obrisiCitat
