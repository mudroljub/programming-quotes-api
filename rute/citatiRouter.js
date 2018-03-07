const router = require('express').Router()

const citati = require('./citati')
const dodajCitat = require('./citati/dodaj')
const azurirajCitat = require('./citati/azuriraj')
const obrisiCitat = require('./citati/obrisi')
const oceniCitat = require('./citati/oceni')

router.get('/', citati)

router.post('/dodaj-citat/', dodajCitat)

router.post('/azuriraj-citat/', azurirajCitat)

router.post('/oceni-citat/', oceniCitat)

router.delete('/obrisi-citat/', obrisiCitat)

module.exports = router

