import { Router } from 'express'
import quotesRouter from './quotesRouter.js'
import authRouter from './authRouter.js'
import userRouter from './userRouter.js'
import { langMiddleware } from '../middleware/lang.js'

const router = new Router()
  .use('/quotes', quotesRouter)
  .use('/:lang/quotes', langMiddleware, quotesRouter)
  .use('/auth', authRouter)
  .use('/users', userRouter)

export default router
