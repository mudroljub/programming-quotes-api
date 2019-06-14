module.exports = (req, res) => {
  const { Quote } = res.locals
  Quote
    .find()
    .select({ "numberOfVotes": 0, "source": 0 })
    .then(quotes => res.send(quotes))
    .catch(e => res.send('SERVER_ERROR', e.message))
}
