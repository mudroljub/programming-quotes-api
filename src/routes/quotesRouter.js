import { Router } from 'express'
import QuoteController from '../controllers/QuoteController.js'
import { authenticate, authorizeUser, authorizeEditor } from '../middleware/auth.js'

const router = new Router()

// special routes
router.get('/random', QuoteController.random)
router.post('/vote', authenticate, QuoteController.vote)

router.get('/', QuoteController.getQuotes) // support /quotes?page=1&numPerPage=10
router.get('/:id', QuoteController.getById)

router.post('/', authorizeUser, QuoteController.create)
router.put('/:id', authorizeEditor, QuoteController.update)

router.delete('/:id', QuoteController.delete)

export default router
