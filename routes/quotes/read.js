module.exports = (req, res) => {
  const { Quote } = res.locals
  Quote
    .find()
    .select()
    .then(quotes => res.send(quotes))
    .catch(e => res.send('SERVER_ERROR', e.message))
}
