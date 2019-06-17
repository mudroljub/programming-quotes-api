const User = require('../../models/User')

module.exports = async(req, res) => {
  const {_id, newVote} = req.body
  const { Quote } = res.locals
  if (newVote > 5 || newVote < 1) return res.status(400).send({message: 'Invalid vote'})

  const quote = await Quote.findById(_id)
  const { rating, numberOfVotes } = quote
  const newRating = (rating * numberOfVotes + Number(newVote)) / (numberOfVotes + 1)
  quote.rating = newRating.toFixed(1)
  quote.save(async err => {
    if (err) return console.error(err)
    if (res.locals.user) {
      const user = await User.findById(res.locals.user._id)
      // always duplicate ids
      // const niz = user.voted.map(x => x._id)
      // const uniq = new Set(niz)
      // console.log(niz[0])
      // uniq.add(_id)
      // user.set({ voted: [...uniq] })
      // user.save()
    }
    res.send({message: 'SUCCESS_SAVED', quote})
  })
}
