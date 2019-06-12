const jwt = require('jsonwebtoken')

const validateToken = (req, res, next) => {
  const token = req.body.token || req.query.token
  if (!token) return res.status(403).send({success: false, message: 'No token.'})

  jwt.verify(token, process.env.JWTSECRET, (err, data) => {
    if (err) return res.json({success: false, message: 'Bad token.'})
    if (!data.user.admin) return res.json({success: false, message: 'Not admin.'})
    next()
  })
}

module.exports = {
  validateToken
}
