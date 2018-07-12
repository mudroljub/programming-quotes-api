const SacredThought = require('../../models/SacredThought')

module.exports = (req, res) => {
  const {_id} = req.body
  SacredThought.findOneAndRemove({_id}, (err) => {
    if (err) throw err
    res.send('QUOTE_DELETED')
  })
}
