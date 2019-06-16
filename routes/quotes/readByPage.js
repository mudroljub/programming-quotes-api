module.exports = async(req, res) => {
  const { pageNumber } = req.params
  const { Quote } = res.locals
  const pageSize = 20

  const quotes = await Quote
    .find()
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .select({ author: 1, en: 1, sr: 1, rating: 1 })
  res.send(quotes)
}
