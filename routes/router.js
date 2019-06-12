const router = require('express').Router()

const quotesRouter = require('./quotes/quotes-router')
const thoughtsRouter = require('./thoughts/thoughts-router')
const authRouter = require('./auth')

router.use('/quotes', quotesRouter)
router.use('/thoughts', thoughtsRouter)
router.use('/auth', authRouter)

module.exports = router
