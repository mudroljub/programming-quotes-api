module.exports = (req, res) => {
  const { Quote } = res.locals
  Quote
    .find()
    .select({ author: 1, en: 1, sr: 1, tags:1, rating: 1 })
    .then(quotes => res.send(quotes))
    .catch(e => res.send('SERVER_ERROR', e.message))
}
