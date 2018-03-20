const router = require('express').Router()

const quotesRouter = require('./quotes/quotes-router')
const moviesRouter = require('./movies/movies-router')
const usersRouter = require('./users/users-router')
const authRouter = require('./auth')

router.use('/', moviesRouter)
router.use('/quotes', quotesRouter)
router.use('/users', usersRouter)
router.use('/auth', authRouter)

module.exports = router
