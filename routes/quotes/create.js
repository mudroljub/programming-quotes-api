module.exports =  (req, res) => {
  const {en, sr, author, source} = req.body
  const { Quote, user } = res.locals

  Quote.create({en, sr, author, source, addedBy: user._id }, (err, quote) => {
    if (err) return res.status(500).send(err)
    res.send({message: 'SUCCESS_SAVED', quote})
  })
}
