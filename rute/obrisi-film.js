const mongodb = require('mongodb')
const mongoUri = 'mongodb://filmovi:filmovi@ds243285.mlab.com:43285/heroku_sljlvq37'

const obrisiFilm = (req, res) => {
  mongodb.MongoClient.connect(mongoUri, (err, db) => {
    db.collection('filmovi').deleteOne({'_id': new mongodb.ObjectID(req.params.id)})
    res.send(`Unos sa ID ${req.params.id} je obrisan.`)
  })
}

module.exports = obrisiFilm
