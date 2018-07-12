const router = require('express').Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const {clientDomain} = require('../config/host')

router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  const token = jwt.sign({user: req.user}, process.env.JWTSECRET)
  res.redirect(`${req.headers.referer}/#/auth/google/${token}`)
})

router.get('/google/:token', (req, res) => {
  jwt.verify(req.params.token, process.env.JWTSECRET, (err, user) => {
    if (err) res.send({res: false})
    res.send(user)
  })
})

module.exports = router
