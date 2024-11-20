import { Router } from 'express'
import quotesRouter from './quotesRouter.js'
import authRouter from './authRouter.js'
import userRouter from './userRouter.js'

const router = new Router()
  .use('/auth', authRouter)
  .use('/quotes', quotesRouter)
  .use('/user', userRouter)

export default router
