const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Sajt je u izgradnji'))

app.listen(port, () => console.log(`Server sluzi na kapiji ${port}.`))
