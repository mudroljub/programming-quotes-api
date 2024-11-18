require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const { marked } = require('marked')
const compression = require('compression')
const { promisify } = require('util')
const fs = require('fs')

const { mongoUri } = require('./config/db')
const { port, domain } = require('./config/host')
const router = require('./routes/router')

const app = express()
const readFileAsync = promisify(fs.readFile)

/* CONFIG */

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(compression())

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .catch(err => console.error('MongoDB connection error:', err))
mongoose.set('useCreateIndex', true)

/* ROUTES */

app.get('/', async(req, res) => {
  const file = await readFileAsync('README.md', 'utf8')
  res.send(marked(file.toString()))
})
app.use('/', router)

/* SERVER */

app.listen(port, () => console.log(`Serving on ${domain}`))
