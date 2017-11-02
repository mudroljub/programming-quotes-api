const express = require('express')
const app = express()
const port = process.env.PORT || 5000

app.get('/', (req, res) => res.send('Baza filmova je u izgradnji'))

app.listen(port, () => console.log(`Server sluzi na kapiji ${port}.`))
