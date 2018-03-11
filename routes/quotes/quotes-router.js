const router = require('express').Router()

router.get('/', require('./read'))
router.post('/create/', require('./create'))
router.post('/update/', require('./update'))
router.post('/rate/', require('./rate'))
router.delete('/delete/', require('./delete'))

module.exports = router
