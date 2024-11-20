import express from 'express'
import AuthController from '../controllers/AuthController.js'

const router = express.Router()

router.post('/token', AuthController.getToken)

export default router
