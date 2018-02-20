const Quote = require('../../models/quotes')

const oceniCitat = (req, res) => {
  Quote.findById(req.body.id)
    .then(quote => {
      quote.rate = ((quote.rate * quote.howManuVotes + req.body.rate) / (quote.howManuVotes + 1)).toFixed(1)
      quote.howManuVotes ++
      return quote.save()
    })
    .then(newQuote => {
      res.send(newQuote)
    })
    .catch(e => {
      res.send('greska')
    })
}

module.exports = oceniCitat
