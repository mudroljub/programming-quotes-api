const SacredThought = require('../../models/SacredThought')

module.exports = (req, res) => {
  SacredThought
    .find()
    .then(quotes => res.send(quotes))
    .catch(e => res.send('SERVER_ERROR'))
}
