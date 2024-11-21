import UserService from '../services/UserService.js'

const serverError = (res, err) =>
  res.status(500).send({ message: 'SERVER_ERROR', error: err.message })

const getUserByEmail = async(req, res) => {
  try {
    const user = await UserService.getByEmail(req.params.email)
    if (!user) return res.status(404).json({ message: 'NOT_FOUND' })

    res.send(user)
  } catch (err) {
    serverError(res, err)
  }
}

const getUserById = async(req, res) => {
  try {
    const user = await UserService.getById(req.params.id)
    if (!user) return res.status(404).json({ message: 'NOT_FOUND' })

    res.send(user)
  } catch (err) {
    serverError(res, err)
  }
}

const getProfile = async(req, res) => {
  try {
    const user = await UserService.getById(req.user.id)
    res.json(user)
  } catch (err) {
    serverError(res, err)
  }
}

export default {
  getUserByEmail,
  getUserById,
  getProfile,
}
