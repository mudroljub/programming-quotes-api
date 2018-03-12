const router = require('express').Router()

router.get('/filmovi', require('./read'))
router.post('/dodaj-film', require('./upsert'))
router.get('/obrisi-film/:id', require('./delete'))

module.exports = router
