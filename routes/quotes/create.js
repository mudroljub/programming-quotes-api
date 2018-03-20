const Quote = require('../../models/Quote')

module.exports =  (req, res) => {
  const {en, sr, author, source} = req.body
  const condition = (en || sr) && author
  if (!condition) return res.send('ARGUMENTS_ERROR')

  Quote.find({$or: [{sr}, {en}]}, (err, results) => {
    if (results.length) return res.send('ALREADY_EXISTS')
  })

  Quote.create({en, sr, author, source}, (err, quote) => {
    if (err) return console.error(err)
    res.send('SUCCESS_SAVED')
  })
}
