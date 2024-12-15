import UserService from '../services/UserService.js'
import AuthService from '../services/AuthService.js'

const getToken = async(req, res) => {
  const { email, password } = req.body
  try {
    const user = await UserService.findOrCreate(email, password)
    const token = AuthService.createToken(user)
    res.json({ message: 'Welcome to Programming Quotes API', token, user })
  } catch (err) {
    const status = err.message === 'BAD_PASSWORD' ? 400 : 500
    res.status(status).json({ message: err.message })
  }
}

export default {
  getToken,
}
