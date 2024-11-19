import 'dotenv/config.js'
import fs from 'fs'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import { marked } from 'marked'
import compression from 'compression'
import { promisify } from 'util'

import { mongoUri } from './config/db.js'
import { port, domain } from './config/host.js'
import router from './routes/router.js'

const app = express()
const readFileAsync = promisify(fs.readFile)

// CONFIG
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(compression())

mongoose.connect(mongoUri)
  .catch(err => console.error('MongoDB connection error:', err))

// ROUTES
app.get('/', async(req, res) => {
  try {
    const file = await readFileAsync('README.md', 'utf8')
    res.send(marked(file.toString()))
  } catch (err) {
    res.status(500).send('Error reading README.md')
  }
})

app.use('/', router)

// SERVER
app.listen(port, () => console.log(`Serving on ${domain}`))
