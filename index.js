require('dotenv').load()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const mongoUri = require('./config/db').mongoUri
const router = require('./routes/router')

const port = process.env.PORT || 5000
const app = express()

/* CONFIG */

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

mongoose.connect(mongoUri)
mongoose.Promise = global.Promise

/* ROUTES */

app.get('/', (req, res) => res.send('Backend API and database for open projects.'))
app.use('/', router)

/* SERVER */

app.listen(port, () => console.log('Serving on', `http://localhost:${port}/`))
