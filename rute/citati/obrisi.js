const Quote = require('../../models/quotes')


const obrisiCitat = (req, res) => {
  Quote.findByIdAndRemove(req.body.id)
    .then(deleted => {
      res.send('izbrisano')
    })
}

module.exports = obrisiCitat
