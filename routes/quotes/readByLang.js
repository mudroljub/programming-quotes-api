const Quote = require('../../models/Quote')

module.exports = (req, res) => {
  const { lang } = req.params
  Quote
    .find({ [lang]: { $ne: '' } })
    .select({ author: 1, [lang]: 1, rating: 1 })
    .then(quotes => res.send(quotes))
    .catch(e => res.send('SERVER_ERROR', e.message))
}
