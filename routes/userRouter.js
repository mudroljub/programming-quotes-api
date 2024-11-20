import express from 'express'
import UserController from '../controllers/UserController.js'

const router = express.Router()

router.get('/email/:email', UserController.getUserByEmail)
// get profile

export default router
