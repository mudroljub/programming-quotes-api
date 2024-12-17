import express from 'express'
import AuthController from '../controllers/AuthController.js'
import { authenticate } from '../middleware/auth.js'

const router = express.Router()

router.post('/token', AuthController.getToken)
router.post('/email', authenticate, AuthController.sendToken)
router.get('/verify/:token', AuthController.verifyEmail)

export default router
