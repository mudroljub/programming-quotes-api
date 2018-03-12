const Quote = require('../../models/Quote')
const lozinka = process.env.LOZINKA

module.exports =  (req, res) => {
  const {en, sr, author, source, password} = req.body
  const condition = (en || sr) && author
  if (!condition) return res.send('ARGUMENTS_ERROR')
  if (password !== lozinka) return res.send('LOGIN_REQUIRED')

  Quote.find({$or: [{sr}, {en}]}, (err, results) => {
    if (results.length) return res.send('ALREADY_EXISTS')
  })

  Quote.create({en, sr, author, source}, (err, quote) => {
    if (err) return console.error(err)
    res.send('SUCCESS_SAVED')
  })
}
