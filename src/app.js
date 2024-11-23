import 'dotenv/config.js'
import fs from 'fs'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import { marked } from 'marked'
import { promisify } from 'util'

import { port, domain } from './config/host.js'
import router from './routes/router.js'
import { normalizeJsonKeys } from './middleware/normalize.js'

const app = express()
const readFileAsync = promisify(fs.readFile)

// MIDDLEWARES
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(normalizeJsonKeys)

mongoose.connect(process.env.CONNECTION_STRING)
  .catch(err => console.error('MongoDB connection error:', err))

// ROUTES
app.get('/', async(req, res) => {
  try {
    const file = await readFileAsync('README.md', 'utf8')
    res.send(marked(file.toString()))
  } catch (err) {
    res.status(500).send('Error reading file')
  }
})

app.use('/', router)

// SERVER
app.listen(port, () => console.log(`Serving on ${domain}`))
