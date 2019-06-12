const Quote = require('../../models/ProgrammingQuote')
const User = require('../../models/User')
const jwt = require('jsonwebtoken')

const saveVote = (token, quoteId) => {
  jwt.verify(token, process.env.JWTSECRET, (err, data) => {
    if (!data.user) return
    User.findById(data.user._id, (err, user) => {
      user.set({ voted: [...user.voted, quoteId] })
      user.save()
    })
  })
}

module.exports = (req, res) => {
  const _id = req.body._id
  const newRating = Number(req.body.newRating)
  if (!_id || !newRating) return res.send('ARGUMENTS_ERROR')

  Quote.findById(_id, (err, quote) => {
    if (err) return console.error(err)
    const {numberOfVotes, rating} = quote
    const newAverage = ((numberOfVotes * rating + newRating) / (numberOfVotes + 1)).toFixed(1)
    quote.set({
      rating: newAverage,
      numberOfVotes: numberOfVotes + 1
    })
    quote.save(err => {
      if (err) return console.error(err)
      res.send(newAverage)
    })
    saveVote(req.body.token || req.query.token, _id)
  })
}
