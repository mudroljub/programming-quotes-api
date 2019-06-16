module.exports = (req, res) => {
  const { Quote } = res.locals

  Quote.estimatedDocumentCount().exec((err, count) => {
    const rand = Math.floor(Math.random() * count)
    Quote
      .findOne()
      .select({ 'author': 1, 'en': 1}) // '_id': 0
      .skip(rand)
      .exec((err, quote) => res.send(quote))
  })
}
