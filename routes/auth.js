const router = require('express').Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')

router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  // console.log(req.user);
  const token = jwt.sign({ token: req.user}, process.env.JWTSECRET)
  res.redirect(`http://localhost:3000/auth/google/${token}`)
})

router.get('/google/:token', (req, res) => {
  console.log(req.params.token)
  jwt.verify(req.params.token, process.env.JWTSECRET, (err, token) => {
    if (err) res.send({res: false})
    console.log('dobar', token)
    res.send({res: true})
  })
})

module.exports = router
