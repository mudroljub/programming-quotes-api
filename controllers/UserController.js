import UserService from '../services/UserService.js'

const getUserByEmail = async(req, res) => {
  const { email } = req.params
  try {
    const user = await UserService.getByEmail(email)
    if (!user)
      return res.status(404).json({ message: 'NOT_FOUND' })

    res.send(user)
  } catch (e) {
    res.status(500).send({ message: 'SERVER_ERROR', error: e.message })
  }
}

const getProfile = async(req, res) => {
  try {
    const user = await UserService.getById(req.user.id)
    res.json(user)
  } catch (e) {
    res.status(500).send({ message: 'SERVER_ERROR', error: e.message })
  }
}

export default {
  getUserByEmail,
  getProfile,
}
