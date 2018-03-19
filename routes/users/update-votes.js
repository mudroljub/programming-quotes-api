const User = require('../../models/User')
const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
  const {localVotes, token} = req.body
  jwt.verify(token, process.env.JWTSECRET, (err, data) => {
    if (!data.user) return
    User.findById(data.user._id, (err, user) => {
      const voted = [...new Set([...user.voted, ...localVotes])]
      user.set({ voted })
      user.save(() => res.send(voted))
    })
  })
}
