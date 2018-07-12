const ProgrammingQuote = require('../../models/ProgrammingQuote')

module.exports = (req, res) => {
  const {_id} = req.body
  ProgrammingQuote.findOneAndRemove({_id}, (err) => {
    if (err) throw err
    res.send('QUOTE_DELETED')
  })
}
