module.exports = async(req, res) => {
  const { pageNumber } = req.params
  const { Quote } = res.locals
  const pageSize = 20

  const quotes = await Quote
    .find()
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .select({ 'numberOfVotes': 0, 'source': 0 })
  res.send(quotes)
}
