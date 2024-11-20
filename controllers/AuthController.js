import jwt from 'jsonwebtoken'

import UserService from '../services/UserService.js' 
const { getUser, createUser } = UserService

const getToken = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await getUser(email, password) || await createUser(email, password)
    const { _id, privilege } = user
    const token = jwt.sign({ _id, privilege }, process.env.JWT_SECRET, { expiresIn: '24h' })
    res.json({ message: 'Welcome to Programming Quotes API', token })
  } catch (err) {
    const status = err.message === 'BAD_PASSWORD' ? 400 : 500
    res.status(status).json({ message: err.message })
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
