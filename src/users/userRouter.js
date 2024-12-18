import express from 'express'
import UserController from './UserController.js'
import { authenticate, authorizeAdmin, allowSelfOrAdmin } from '../middleware/auth.js'

const router = express.Router()

router.get('/profile', authenticate, UserController.getProfile)
router.get('/email/:email', UserController.getByEmail)

router.get('/', UserController.getAll)
router.get('/:id', UserController.getById)

router.post('/:id', authenticate, allowSelfOrAdmin, UserController.update)
router.delete('/:id', authenticate, allowSelfOrAdmin, UserController.delete)

router.use(authorizeAdmin)
router.post('/:id/privilege', UserController.addPrivilege)

export default router
