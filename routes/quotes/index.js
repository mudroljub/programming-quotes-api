const router = require('express').Router()
const { validateUser, validateAdmin } = require('../../utils/helpers')

router.get('/', require('./read'))
router.get('/lang/:lang', require('./readByLang'))
router.get('/page/:pageNumber', require('./readByPage'))
router.get('/random', require('./random'))
router.get('/random/lang/:lang', require('./randomByLang'))
router.get('/id/:_id', require('./getById'))

router.use(validateUser) // auth middleware (all routes bellow are protected)
router.post('/', require('./create'))
router.use(validateAdmin)
router.put('/', require('./update'))
router.delete('/', require('./delete'))

module.exports = router
