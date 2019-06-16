module.exports = (req, res) => {
  const { _id } = req.params
  const { Quote } = res.locals

  Quote.findById(_id, (err, quote) => {
    if (err) return console.error(err)
    res.send(quote)
  })
}
