import UserService from '../users/UserService.js'
import AuthService from './AuthService.js'
import { clientDomain } from '../config/host.js'

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

const sendToken = async(req, res) => {
  if (!req.user) return res.status(400).send({ message: 'NO_USER' })
  const user = await UserService.getById(req.user.id)

  try {
    const info = AuthService.sendToken(user)
    res.status(200).send(`Email sent: ${info.response}`)
  } catch (error) {
    console.error(error)
    res.status(500).send('Failed to send email')
  }
}

const verifyEmail = async(req, res) => {
  const { token } = req.params
  try {
    const data = AuthService.validateToken(token)
    await UserService.addPrivilege(data.id, 1)
    res.redirect(`${clientDomain}/profile`)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

export default {
  getToken,
  sendToken,
  verifyEmail,
}
