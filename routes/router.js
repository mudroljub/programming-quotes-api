const router = require('express').Router()
const { model } = require('mongoose')
const QuotesSchema = require('../models/QuoteSchema')
const quotesRouter = require('./quotes/')
const authRouter = require('./auth')

router.use('/quotes/', (req, res, next) => {
  res.locals.Quote = model('Quote', QuotesSchema, 'programmingQuotes')
  next()
}, quotesRouter)

router.use('/svetemisli/', (req, res, next) => {
  res.locals.Quote = model('Quote', QuotesSchema, 'svetemisli')
  next()
}, quotesRouter)

router.use('/auth', authRouter)

module.exports = router
