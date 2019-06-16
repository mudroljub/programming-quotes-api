require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const marked = require('marked')
const fs = require('fs')

const mongoUri = require('./config/db').mongoUri
const {port, domain} = require('./config/host')
const router = require('./routes/router')
const app = express()

const passport = require('./config/passport')
app.use(passport.initialize())
app.use(passport.session())

/* CONFIG */

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

mongoose.connect(mongoUri, { useNewUrlParser: true })
mongoose.set('useCreateIndex', true)

/* ROUTES */

app.get('/', (req, res) => {
  const file = fs.readFileSync('./README.md', 'utf8')
  res.send(marked(file.toString()))
})
app.use('/', router)

/* SERVER */

app.listen(port, () => console.log(`Serving on ${domain}`))
