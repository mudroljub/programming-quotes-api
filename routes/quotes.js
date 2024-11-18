const router = require('express').Router()
const { validateUser, validateAdmin } = require('../utils/helpers')
const QuoteController = require('../controllers/QuoteController')

router.get('/', QuoteController.getAll)
router.get('/lang/:lang', QuoteController.readByLang)
router.get('/page/:pageNumber', QuoteController.readByPage)
router.get('/random', QuoteController.random)
router.get('/random/lang/:lang', QuoteController.randomByLang)
router.get('/id/:_id', QuoteController.getById)

router.use(validateUser) // all routes bellow are protected

router.post('/vote', QuoteController.vote)
router.post('/', QuoteController.create)
router.use(validateAdmin)
router.put('/', QuoteController.update)
router.delete('/', QuoteController.delete)

module.exports = router
