const router = require('express').Router()

const filmovi = require('./filmovi')
const dodajFilm = require('./filmovi/dodaj')
const obrisiFilm = require('./filmovi/obrisi')

router.get('/', filmovi)
router.post('/dodaj-film', dodajFilm)
router.get('/obrisi-film/:id', obrisiFilm)

module.exports = router