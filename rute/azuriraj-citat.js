const mongodb = require('mongodb')
const mongoUri = process.env.MONGODB_URI

const azurirajCitat = (req, res) => {
  const {_id, sr, autor, izvor, en} = req.body
  const uslov = (en || sr) && autor
  if (!uslov) return res.send('Niste poslali obavezna polja.')
  
  mongodb.MongoClient.connect(mongoUri, (err, db) => {
    if(err) throw err
    db.collection('citati').update(
       {_id},
       {$set: {sr, autor, izvor, en}}
    )
    res.send('Hvala na azuriranju baze citata.')
  })
}

module.exports = azurirajCitat
