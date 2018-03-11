const router = require('express').Router()

router.get('/filmovi', require('./movies/read'))
router.post('/dodaj-film', require('./movies/upsert'))
router.get('/obrisi-film/:id', require('./movies/delete'))

module.exports = router
