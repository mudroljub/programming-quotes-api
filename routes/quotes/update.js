const Quote = require('../../models/Quote')

module.exports = (req, res) => {
  const {_id} = req.body

  Quote.findById(_id, (err, quote) => {
    if (err) return console.error(err)
    quote.set({...req.body})
    quote.save(err => {
      if (err) return console.error(err)
      res.send({message: 'SUCCESS_SAVED', quote})
    })
  })
}
