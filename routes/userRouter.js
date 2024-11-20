import express from 'express'
import UserController from '../controllers/UserController.js'
import { authenticate } from '../utils/middleware.js'

const router = express.Router()

router.get('/email/:email', UserController.getUserByEmail)

router.get('/profile', authenticate, UserController.getProfile)

export default router
