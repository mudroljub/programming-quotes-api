module.exports = (req, res) => {
  const { lang } = req.params
  const { Quote } = res.locals
  const query = { [lang]: { $ne: '' } }

  Quote
    .countDocuments(query)
    .exec((err, n) => {
      const rand = Math.floor(Math.random() * n)
      Quote
        .findOne(query)
        // .select({ author: 1, [lang]: 1 })
        .skip(rand)
        .exec((err, quote) => res.send(quote))
    })
}
