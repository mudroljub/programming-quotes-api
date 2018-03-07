const Quote = require('../../models/quotes')

const citati = (req, res) => {
    Quote.find()
      .then(quotes => {
        res.send(quotes)
      })
      .catch(e => {
        res.send('doslo je do greske')
      })
}

module.exports = citati
