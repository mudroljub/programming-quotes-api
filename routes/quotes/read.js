const Quote = require('../../models/Quote')

module.exports = (req, res) => {
  Quote
    .find()
    .select()
    .then(quotes => res.send(quotes))
    .catch(e => res.send('SERVER_ERROR', e.message))
}
