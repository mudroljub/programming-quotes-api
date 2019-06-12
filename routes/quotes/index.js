const router = require('express').Router()
const { validateToken } = require('../../utils/helpers')

router.get('/', require('./read'))
router.use(validateToken) // auth middleware (all routes bellow are protected)
router.post('/', require('./create'))
router.put('/', require('./update'))
router.delete('/', require('./delete'))

module.exports = router
