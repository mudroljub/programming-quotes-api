import express from 'express'
import UserController from '../controllers/UserController.js'
import { authenticate } from '../utils/middleware.js'

const router = express.Router()

router.get('/id/:id', UserController.getUserById)
router.get('/email/:email', UserController.getUserByEmail)
router.use(authenticate)
router.get('/profile', UserController.getProfile)

export default router
