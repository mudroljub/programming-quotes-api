const Quote = require('../../models/Quote')

module.exports = (req, res) => {
  const { _id } = req.params

  Quote.findById(_id, (err, quote) => {
    if (err) return console.error(err)
    res.send(quote)
  })
}
