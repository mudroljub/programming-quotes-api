const mongodb = require('mongodb')
const mongoUri = require('../../config/db').mongoUri

module.exports = (req, res) => {
  mongodb.MongoClient.connect(mongoUri, (err, db) => {
    db.collection('filmovi').deleteOne({'_id': new mongodb.ObjectId(req.params.id)})
    res.send(`Unos sa ID ${req.params.id} je obrisan.`)
  })
}
