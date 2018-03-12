const Quote = require('../../models/Quote')
const lozinka = process.env.LOZINKA

module.exports = (req, res) => {
  const {_id, password} = req.body
  if (password !== lozinka) return res.send('LOGIN_REQUIRED')

  Quote.findOneAndRemove({_id}, (err) => {
    if (err) throw err
    res.send('QUOTE_DELETED')
  })
}
