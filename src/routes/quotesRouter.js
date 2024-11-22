import { Router } from 'express'
import QuoteController from '../controllers/QuoteController.js'
import { authenticate, authorizeAdmin } from '../middleware/auth.js'

const router = new Router()

router.get('/', QuoteController.getAll)
// router.get('/lang/:lang', QuoteController.readByLang)
// router.get('/page/:pageNumber', QuoteController.readByPage)

router.get('/random', QuoteController.random)
// router.get('/random/lang/:lang', QuoteController.randomByLang)
router.get('/:id', QuoteController.getById)

router.use(authenticate) // all routes bellow are protected
router.post('/vote', QuoteController.vote)
router.use(authorizeAdmin)
router.post('/', QuoteController.create)
router.put('/', QuoteController.update)

router.delete('/:id', QuoteController.delete)

export default router
