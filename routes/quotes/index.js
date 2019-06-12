const router = require('express').Router()
const {validateToken} = require('../../utils/helpers')

router.get('/', require('./read'))
router.post('/rate/', require('./rate'))

router.use(validateToken) // auth middleware (all routes bellow are protected)

router.post('/create/', require('./create'))
router.post('/update/', require('./update'))
router.delete('/delete/', require('./delete'))

module.exports = router
