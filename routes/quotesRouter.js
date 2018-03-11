const router = require('express').Router()

router.get('/', require('./quotes/read'))
router.post('/create/', require('./quotes/create'))
router.post('/update/', require('./quotes/update'))
router.post('/rate/', require('./quotes/rate'))
router.delete('/delete/', require('./quotes/delete'))

module.exports = router
