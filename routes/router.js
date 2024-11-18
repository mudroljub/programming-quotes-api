const router = require('express').Router()
const Quote = require('../models/Quote')
const quotesRouter = require('./quotes/')
const authRouter = require('./auth')

router.use('/quotes', (req, res, next) => {
  res.locals.Quote = Quote
  next()
}, quotesRouter)

router.use('/auth', authRouter)

module.exports = router
