import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/User.js'

const getToken = async (req, res) => {
  const { email, password } = req.body

  try {
    const existingUser = await User.findOne({ email })
    if (existingUser && !await bcrypt.compare(password, existingUser.password))
      return res.status(400).json({ message: 'Bad password' })

    const user = existingUser 
      ? existingUser 
      : new User({
          email,
          password: await bcrypt.hash(password, 10),
        })
    if (!existingUser) await user.save()

    const { _id, privilege } = user
    const token = jwt.sign({ _id, privilege }, process.env.JWT_SECRET, { expiresIn: '24h' })
    return res.json({ message: 'Welcome to Programming Quotes API', token })

  } catch (err) {
    res.status(500).send({ message: 'SERVER_ERROR', error: err.message })
  }
}

const validatePrivilege = (level) => async (req, res, next) => {
  const { token } = req.body
  if (!token) return res.status(403).send({ message: 'No token.' })

  try {
    const { privilege } = jwt.verify(token, process.env.JWT_SECRET)

    if (privilege < level)
      return res.status(403).json({ message: 'Not authorized.' })

    next()
  } catch (err) {
    res.status(403).json({ message: 'Bad token.', error: err.message })
  }
}

const validateUser = validatePrivilege(1)

const validateAdmin = validatePrivilege(3)

export default {
  getToken,
  validateUser,
  validateAdmin,
}
