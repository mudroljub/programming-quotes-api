import jwt from 'jsonwebtoken'
import UserService from '../services/UserService.js' 

const { JWT_SECRET } = process.env

const getToken = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await UserService.findOrCreateUser(email, password)
    const tokenData = { _id: user.id, privilege: user.privilege }
    const token = jwt.sign(tokenData, JWT_SECRET, { expiresIn: '24h' })
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
    const { privilege } = jwt.verify(token, JWT_SECRET)

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
