const router = require('express').Router()
const { validateToken, validateAdmin } = require('../../utils/helpers')

router.get('/', require('./read'))
router.get('/lang/:lang', require('./readByLang'))
router.get('/random', require('./random'))
router.use(validateToken) // auth middleware (all routes bellow are protected)
router.post('/', require('./create'))
router.use(validateAdmin)
router.put('/', require('./update'))
router.delete('/', require('./delete'))

module.exports = router
