import { Router } from 'express'
import compression from 'compression'

import QuoteController from '../controllers/QuoteController.js'
import { authenticate, authorizeUser, authorizeEditor } from '../middleware/auth.js'
import { normalizeQueryParams } from '../middleware/normalize.js'

const router = new Router()

// preceding routes
router.get('/random', QuoteController.random)
router.post('/vote', authenticate, QuoteController.vote)

// query params: page, quotesPerPage, author
router.get('/', normalizeQueryParams, compression(), QuoteController.getQuotes)
router.get('/:id', QuoteController.getById)
router.post('/', authorizeUser, QuoteController.create)
router.put('/:id', authorizeEditor, QuoteController.update)
router.delete('/:id', QuoteController.delete)

export default router