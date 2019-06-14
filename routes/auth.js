const router = require('express').Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')

let clientDomain = ''

// prihvata zahtev klijenta i salje na google login
router.get('/google', (req, res, next) => {
  clientDomain = req.headers.referer
  passport.authenticate('google', { scope: ['profile'] })(req, res, next)
})

// prihvata token od googla nakon autentifikacije i salje klijentu
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  const token = jwt.sign({user: req.user}, process.env.JWTSECRET)
  res.redirect(`${clientDomain}#/auth/google/${token}`)
})

// proverava token i nalazi korisnika
router.get('/google/:token', (req, res) => {
  jwt.verify(req.params.token, process.env.JWTSECRET, (err, user) => {
    if (err) res.send({res: false})
    res.send(user)
  })
})

module.exports = router
