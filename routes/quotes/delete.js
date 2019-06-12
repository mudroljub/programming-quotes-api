const Quote = require('../../models/ProgrammingQuote')

module.exports = (req, res) => {
  const {_id} = req.body
  Quote.findOneAndRemove({_id}, (err) => {
    if (err) throw err
    res.send('QUOTE_DELETED')
  })
}
