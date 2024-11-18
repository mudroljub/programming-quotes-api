const router = require('express').Router()
const quotesRouter = require('./quotes')
// const authRouter = require('./auth')

router.use('/quotes', quotesRouter)
// router.use('/auth', authRouter)

module.exports = router
