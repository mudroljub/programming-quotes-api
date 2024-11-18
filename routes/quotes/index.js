const router = require('express').Router()
const { validateUser, validateAdmin, findIfUser } = require('../../utils/helpers')
const QuoteController = require('../../controllers/QuoteController')

router.get('/', QuoteController.getAllQuotes)
router.get('/lang/:lang', require('./readByLang'))
router.get('/page/:pageNumber', require('./readByPage'))
router.get('/random', require('./random'))
router.get('/random/lang/:lang', require('./randomByLang'))
router.get('/id/:_id', QuoteController.getQuoteById)

router.use(findIfUser)
router.post('/vote', require('./vote'))

router.use(validateUser) // all routes bellow are protected
router.post('/', QuoteController.createQuote)
router.use(validateAdmin)
router.put('/', QuoteController.updateQuote)
router.delete('/', QuoteController.deleteQuote)

module.exports = router
