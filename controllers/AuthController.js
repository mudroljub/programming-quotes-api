import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/User.js'

const getToken = async (req, res) => {
  const { email, password } = req.body

  try {
    let user = await User.findOne({ email })
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) 
        return res.status(400).json({ message: 'Bad password' })

    } else {
      user = new User({
        email,
        password: await bcrypt.hash(password, 10)
      })
      await user.save()
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' })
    return res.json({ message: 'Welcome to Programming Quotes API', token })

  } catch (er) {
    res.status(500).send({ message: 'SERVER_ERROR', error: er.message })
  }
}

const validateUser = async (req, res, next) => {
  const { token } = req.body
  if (!token) return res.status(403).send({ success: false, message: 'No token.' })

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET)
    console.log(data)
    next()
  } catch {
    res.status(403).json({ success: false, message: 'Bad token.' })
  }
}

const validateAdmin = (req, res, next) => {
  // TODO: if (privilege > 2)
  if (true) 
      return res.json({ success: false, message: 'Not admin.' })
  next()
}

export default {
  getToken,
  validateUser,
  validateAdmin,
}
