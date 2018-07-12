const SacredThought = require('../../models/SacredThought')

module.exports = (req, res) => {
  const {en, sr, author, source} = req.body
  const condition = (en || sr) && author
  if (!condition) return res.send({message: 'ARGUMENTS_ERROR'})

  SacredThought.find({$or: [{sr}, {en}]}, (err, results) => {
    if (results.length) return res.send({message: 'ALREADY_EXISTS'})
  })

  SacredThought.create({en, sr, author, source}, (err, quote) => {
    if (err) return console.error(err)
    res.send({message: 'SUCCESS_SAVED', quote})
  })
}
