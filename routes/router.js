const router = require('express').Router()

const quotesRouter = require('./quotes/quotes-router')
const moviesRouter = require('./movies/movies-router')

router.use('/quotes', quotesRouter)
router.use('/', moviesRouter)

module.exports = router
