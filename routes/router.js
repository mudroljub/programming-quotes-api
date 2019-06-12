const router = require('express').Router()
const { model } = require('mongoose')

const QuotesSchema = require('../models/QuoteSchema')
const quotesRouter = require('./quotes/')
const authRouter = require('./auth')

router.use('/collection/:name/', (req, res, next) => {
  const { name } = req.params
  if (name == 'quotes') res.locals.model = model('ProgrammingQuote', QuotesSchema, 'programmingQuotes')
  if (name == 'thoughts') res.locals.model = model('SacredThought', QuotesSchema, 'sacredThoughts')
  // model je setovan, treba ga iskoristiti u rutama
  next()
}, quotesRouter)

router.use('/auth', authRouter)

module.exports = router
