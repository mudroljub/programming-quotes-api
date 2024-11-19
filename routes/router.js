import { Router } from 'express'
import quotesRouter from './quotes.js'

const router = new Router()
router.use('/quotes', quotesRouter)

export default router
