import 'dotenv/config.js'
import { promises as fs } from 'fs'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import { marked } from 'marked'
import next from 'next'

import { port, domain } from './config/host.js'
import apiRouter from './routes/router.js'
import { normalizeJsonKeys } from './middleware/normalize.js'

const nextApp = next({ dev: process.env.NODE_ENV === 'development' })
const handle = nextApp.getRequestHandler()

const server = express()

// MIDDLEWARES
server.use(cors())
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())
server.use(normalizeJsonKeys)

mongoose.connect(process.env.CONNECTION_STRING)
  .catch(err => console.error('Could not connect to database:', err))

// ROUTES
server.get('/api', async(req, res) => {
  try {
    const data = await fs.readFile('README.md', 'utf8')
    res.send(marked(data))
  } catch (err) {
    res.status(500).send(`Error reading file: ${err.message}`)
  }
})

server.use('/api/', apiRouter)

// SERVER

nextApp.prepare().then(() => {
  // ostale rute preusmeravamo na nextjs
  server.all('*', (req, res) => handle(req, res))

  server.listen(port, () => console.log(`Serving on ${domain}`))
})
