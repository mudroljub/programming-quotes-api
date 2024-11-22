import express from 'express'
import UserController from '../controllers/UserController.js'
import { authenticate, authorizeAdmin, allowSelfOrAdmin } from '../middleware/auth.js'

const router = express.Router()

router.get('/profile', authenticate, UserController.getProfile)
router.get('/email/:email', UserController.getUserByEmail)

router.get('/', UserController.listUsers)
router.get('/:id', UserController.getUserById)

router.post('/:id', authenticate, allowSelfOrAdmin, UserController.updateUser)
router.delete('/:id', authenticate, allowSelfOrAdmin, UserController.deleteUser)

router.use(authorizeAdmin)
router.post('/:id/privilege', UserController.addPrivilege)

export default router
