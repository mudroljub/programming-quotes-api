const router = require('express').Router()

const quotesRouter = require('./quotes/')
const thoughtsRouter = require('./thoughts/')
const authRouter = require('./auth')

router.use('/quotes', quotesRouter)
router.use('/thoughts', thoughtsRouter)
router.use('/auth', authRouter)

module.exports = router
