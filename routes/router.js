import { Router } from 'express'
import quotesRouter from './quotes.js'
import authRouter from './auth.js'

const router = new Router()
router.use('/quotes', quotesRouter)
router.use('/auth', authRouter)

export default router
