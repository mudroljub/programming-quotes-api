import UserService from '../services/UserService.js'
import AuthService from '../services/AuthService.js'

const getToken = async(req, res) => {
  const { email, password } = req.body
  try {
    const user = await UserService.findOrCreate(email, password)
    const token = AuthService.createToken(user.id, user.privilege)
    res.json({ message: 'Welcome to Programming Quotes API', token, user })
  } catch (err) {
    const status = err.message === 'BAD_PASSWORD' ? 400 : 500
    res.status(status).json({ message: err.message })
  }
}

const sendEmail = async(req, res) => {
  if (!req.user) return res.status(400).send({ message: 'NO_USER' })
  const user = await UserService.getById(req.user.id)

  try {
    const info = AuthService.sendEmail(user)
    res.status(200).send(`Email sent: ${info.response}`)
  } catch (error) {
    console.error(error)
    res.status(500).send('Failed to send email')
  }
}

const verifyEmail = async(req, res) => {
  const { token } = req.params
  console.log(token)
  try {
    AuthService.validateToken(token)
    res.send('verified')
    // TODO: update privilege, redirect to client app
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

export default {
  getToken,
  sendEmail,
  verifyEmail,
}
