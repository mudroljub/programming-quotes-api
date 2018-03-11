const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./routes/router')

const port = process.env.PORT || 5000
const app = express()

/* CONFIG */

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

/* ROUTES */

app.get('/', (req, res) => res.send('Baza podataka u izgradnji.'))
app.use('/', router)

/* SERVER */

app.listen(port, () => console.log('Služitelj sluzi na kapiji', port))
