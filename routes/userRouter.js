import express from 'express'
import UserController from '../controllers/UserController.js'
import { authenticate } from '../utils/middleware.js'
// TODO: fix lint!!!

const router = express.Router()

router.get('/email/:email', UserController.getUserByEmail)

router.get('/profile', authenticate, async (req, res) => {
  try {
    console.log(req.user)
    const userId = req.user.id // Korisnički podaci su sada dostupni u req.user
    const user = await User.findById(userId)

    if (!user)
      return res.status(404).json({ error: 'User not found' })

    res.json(user)
  } catch (e) {
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
