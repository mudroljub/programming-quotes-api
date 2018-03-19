const Quote = require('../../models/Quote')

module.exports = (req, res) => {
  Quote
    .find()
    .then(quotes => res.send(quotes))
    .catch(e => res.send('SERVER_ERROR'))
}
