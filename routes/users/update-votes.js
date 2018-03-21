const User = require('../../models/User')
const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
  const {voted, token} = req.body
  if (!token) return res.send('No token.')
  jwt.verify(token, process.env.JWTSECRET, (err, data) => {
    if (!data || !data.user) return res.send('No user data.')
    User.findById(data.user._id, (err, user) => {
      user.set({ voted })
      user.save()
      res.send('ok')
    })
  })
}
