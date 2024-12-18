import 'dotenv/config.js'
import { promises as fs } from 'fs'
import express, { Router } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import { marked } from 'marked'

import quotesRouter from './quotes/quotesRouter.js'
import authRouter from './auth/authRouter.js'
import userRouter from './users/userRouter.js'

import { port, domain } from './commons/config.js'
import { normalizeJsonKeys } from './middleware/normalize.js'

const app = express()

// MIDDLEWARES
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(normalizeJsonKeys)

mongoose.connect(process.env.CONNECTION_STRING)
  .catch(err => console.error('Could not connect to database:', err))

// ROUTES
const router = new Router()
  .use('/quotes', quotesRouter)
  .use('/auth', authRouter)
  .use('/users', userRouter)

app.get('/', async(req, res) => {
  try {
    const data = await fs.readFile('README.md', 'utf8')
    res.send(marked(data))
  } catch (err) {
    res.status(500).send(`Error reading file: ${err.message}`)
  }
})

app.use('/api/', router)

// SERVER
app.listen(port, () => console.log(`Serving on ${domain}`))
