module.exports = async(req, res) => {
  const {_id, newVote} = req.body
  const { Quote } = res.locals
  if (newVote > 5 || newVote < 1) return res.status(400).send({message: 'Invalid vote'})

  const quote = await Quote.findById(_id)
  const { rating, numberOfVotes } = quote
  const newRating = (rating * numberOfVotes + Number(newVote)) / (numberOfVotes + 1)
  quote.rating = newRating.toFixed(2)
  quote.save(err => {
    if (err) return console.error(err)
    res.send({message: 'SUCCESS_SAVED', quote})
  })
}
