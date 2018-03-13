const router = require('express').Router()

const quotesRouter = require('./quotes/quotes-router')
const moviesRouter = require('./movies/movies-router')
const authRouter = require('./auth')

router.use('/quotes', quotesRouter)
router.use('/', moviesRouter)
router.use('/auth', authRouter)

module.exports = router
