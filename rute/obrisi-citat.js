const mongodb = require('mongodb')
const mongoUri = process.env.MONGODB_URI

const obrisiCitat = (req, res) => {
  mongodb.MongoClient.connect(mongoUri, (err, db) => {
    db.collection('citati').deleteOne({'_id': new mongodb.ObjectID(req.body.id)})
    res.send(`Unos sa ID ${req.body.id} je obrisan.`)
  })
}

module.exports = obrisiCitat
