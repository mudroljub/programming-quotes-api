const User = require('../../models/User')
const jwt = require('jsonwebtoken')

module.exports = (req) => {
  const {voted, token} = req.body
  jwt.verify(token, process.env.JWTSECRET, (err, data) => {
    if (!data.user) return
    User.findById(data.user._id, (err, user) => {
      user.set({ voted })
      user.save()
    })
  })
}
