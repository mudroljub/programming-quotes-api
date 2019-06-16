const router = require('express').Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')

let clientDomain = ''

const providers = ['google', 'github']
for (const provider of providers) {
  // login
  router.get(`/${provider}`, (req, res, next) => {
    clientDomain = req.headers.referer
    passport.authenticate(provider)(req, res, next)
  })

  // pass token from provider to client on callback
  router.get(`/${provider}/redirect`, passport.authenticate(provider), (req, res) => {
    const token = jwt.sign({user: req.user}, process.env.JWTSECRET)
    res.redirect(`${clientDomain}#/auth/${provider}/${token}`)
  })

  // find user
  router.get(`/${provider}/:token`, (req, res) => {
    jwt.verify(req.params.token, process.env.JWTSECRET, (err, user) => {
      if (err) return res.send({res: false})
      res.send(user)
    })
  })
}

module.exports = router