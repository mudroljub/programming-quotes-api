import express from 'express'
import UserController from '../controllers/UserController.js'
import { authenticate, authorizeAdmin, authorizeEditor, allowSelfOrAdmin } from '../middleware/auth.js'

const router = express.Router()

router.get('/profile', authenticate, UserController.getProfile)
router.get('/email/:email', UserController.getUserByEmail)

router.get('/', UserController.listUsers)
router.get('/:id', UserController.getUserById)
router.post('/:id', authenticate, allowSelfOrAdmin, UserController.updateUser)

// router.use(authorizeEditor)

router.use(authorizeAdmin)
router.delete('/:id', UserController.deleteUser)
router.post('/:id/privilege', UserController.addPrivilege)

export default router
