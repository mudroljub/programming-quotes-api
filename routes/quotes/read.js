const ProgrammingQuote = require('../../models/ProgrammingQuote')

module.exports = (req, res) => {
  ProgrammingQuote
    .find()
    .then(quotes => res.send(quotes))
    .catch(e => res.send('SERVER_ERROR', e.message))
}
