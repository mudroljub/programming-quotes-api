require('dotenv').load()
const express = require('express')
const http = require('http')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')

require('./config/passport')

const filmovi = require('./rute/filmoviRouter')
const citati = require('./rute/citatiRouter')
const auth = require('./rute/auth')

const mongoUri = require('./config').mongoUri

mongoose.connect(mongoUri)
mongoose.Promise = global.Promise

const port = process.env.PORT || 3001
const app = express()

var corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
  };

app.use(cors(corsOption))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(passport.initialize());

app.use('/filmovi', filmovi)
app.use('/citati', citati)
app.use('/auth', auth)

app.get('/', (req, res) => res.send('Baza podataka u izgradnji.'))

app.listen(port, () => console.log('Server on port', port))
