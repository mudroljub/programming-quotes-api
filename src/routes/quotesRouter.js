import { Router } from 'express'
import QuoteController from '../controllers/QuoteController.js'
import { authenticate, authorizeUser, authorizeEditor } from '../middleware/auth.js'

const router = new Router()

router.get('/random', QuoteController.random)
router.post('/vote', authenticate, QuoteController.vote)

/* support: /quotes?page=1&numPerPage=10 */
router.get('/', QuoteController.getQuotes)

// router.get('/lang/:lang', QuoteController.readByLang)

// router.get('/random/lang/:lang', QuoteController.randomByLang)
router.get('/:id', QuoteController.getById)

router.post('/', authorizeUser, QuoteController.create)
router.put('/', authorizeEditor, QuoteController.update)

router.delete('/:id', QuoteController.delete)

export default router
