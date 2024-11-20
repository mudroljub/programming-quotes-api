import jwt from 'jsonwebtoken'
import UserService from '../services/UserService.js' 

const { JWT_SECRET } = process.env

const getToken = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await UserService.findOrCreateUser(email, password)
    const tokenData = { userId: user.id, privilege: user.privilege }
    const token = jwt.sign(tokenData, JWT_SECRET, { expiresIn: '24h' })
    res.json({ message: 'Welcome to Programming Quotes API', token })
  } catch (err) {
    const status = err.message === 'BAD_PASSWORD' ? 400 : 500
    res.status(status).json({ message: err.message })
  }
}

export default {
  getToken,
}
