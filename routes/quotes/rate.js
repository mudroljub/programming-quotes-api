const Quote = require('../../models/Quote')
const jwt = require('jsonwebtoken')

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

    const token = req.body.token || req.query.token || req.headers['x-access-token']
    jwt.verify(token, process.env.JWTSECRET, (err, data) => {
      // if (data.user.voted) data.user.voted.push(_id)
      console.log(data.user.voted)
    })
  })
}
