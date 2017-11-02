// https://docs.mongodb.com/getting-started/shell/query/
// https://docs.mongodb.com/manual/reference/method/db.collection.find/

const mongodb = require('mongodb')
const uri = 'mongodb://filmovi:filmovi@ds243285.mlab.com:43285/heroku_sljlvq37'

const izlistaj = (err, podaci) => {
  podaci.forEach(item => console.log(`Naziv: ${item.naziv}, Godina: ${item.godina}, Slika: ${item.slika}`))
}

const nadji = (err, db) => {
  if (err) throw err

  db.collection('filmovi')
    .find({
      ocena: {$gte: 5} // greater then
    })
    .sort({godina: 1})  // ili padajuce -1
    .toArray(izlistaj)

  db.close()
}

mongodb.MongoClient.connect(uri, nadji)
