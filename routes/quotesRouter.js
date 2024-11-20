import { Router } from 'express'
import QuoteController from '../controllers/QuoteController.js'
import { validateUser, validateAdmin } from '../utils/middleware.js'

const router = new Router()

router.get('/', QuoteController.getAll)
router.get('/lang/:lang', QuoteController.readByLang)
router.get('/page/:pageNumber', QuoteController.readByPage)
router.get('/random', QuoteController.random)
router.get('/random/lang/:lang', QuoteController.randomByLang)
router.get('/id/:_id', QuoteController.getById)

router.use(validateUser) // all routes bellow are protected
router.post('/vote', QuoteController.vote)
router.use(validateAdmin)
router.post('/', QuoteController.create)
router.put('/', QuoteController.update)
router.delete('/', QuoteController.deleteQuote)

export default router
