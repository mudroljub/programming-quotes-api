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

const updateUser = async(req, res) => {
  try {
    const user = await UserService.updateUser(req.params.id, req.body)
    if (!user) return res.status(404).json({ message: 'USER_NOT_FOUND' })

    res.send(user)
  } catch (err) {
    serverError(res, err)
  }
}

const deleteUser = async(req, res) => {
  const { id } = req.params

  try {
    const deletedUser = await UserService.deleteUser(id)
    if (!deletedUser) return res.status(404).json({ message: 'USER_NOT_FOUND' })

    res.status(200).json({ message: 'USER_DELETED', user: deletedUser })
  } catch (err) {
    serverError(res, err)
  }
}

const listUsers = async(req, res) => {
  try {
    const users = await UserService.listUsers()
    res.send(users)
  } catch (err) {
    serverError(res, err)
  }
}

const addPrivilege = async(req, res) => {
  const { privilege } = req.body
  try {
    const user = await UserService.addPrivilege(req.params.id, privilege)
    if (!user) return res.status(404).json({ message: 'USER_NOT_FOUND' })

    res.status(200).json(user)
  } catch (err) {
    serverError(res, err)
  }
}

export default {
  getUserByEmail,
  getUserById,
  getProfile,
  listUsers,
  updateUser,
  deleteUser,
  addPrivilege,
}
