import { Router } from 'express'
import quotesRouter from './quotesRouter.js'
import authRouter from './authRouter.js'

const router = new Router()
router.use('/quotes', quotesRouter)
router.use('/auth', authRouter)

export default router
