import UserService from './UserService.js'
import { handleError } from '../commons/utils.js'

const getByEmail = async(req, res) => {
  try {
    const user = await UserService.getByEmail(req.params.email)
    if (!user) return res.status(404).json({ message: 'NOT_FOUND' })

    res.send(user)
  } catch (err) {
    handleError(res, err)
  }
}

const getById = async(req, res) => {
  try {
    const user = await UserService.getById(req.params.id)
    if (!user) return res.status(404).json({ message: 'NOT_FOUND' })

    res.send(user)
  } catch (err) {
    handleError(res, err)
  }
}

const getProfile = async(req, res) => {
  try {
    const user = await UserService.getById(req.user.id)
    res.json(user)
  } catch (err) {
    handleError(res, err)
  }
}

const update = async(req, res) => {
  try {
    const user = await UserService.update(req.params.id, req.body)
    if (!user) return res.status(404).json({ message: 'USER_NOT_FOUND' })

    res.send(user)
  } catch (err) {
    handleError(res, err)
  }
}

const deleteUser = async(req, res) => {
  try {
    const user = await UserService.delete(req.params.id)
    if (!user)
      return res.status(404).json({ message: 'USER_NOT_FOUND' })

    res.status(200).json({ message: 'USER_DELETED', user })
  } catch (err) {
    handleError(res, err)
  }
}

const getAll = async(req, res) => {
  try {
    const users = await UserService.getAll()
    res.send(users)
  } catch (err) {
    handleError(res, err)
  }
}

const addPrivilege = async(req, res) => {
  const { privilege } = req.body
  try {
    const user = await UserService.addPrivilege(req.params.id, privilege)
    if (!user) return res.status(404).json({ message: 'USER_NOT_FOUND' })

    res.status(200).json(user)
  } catch (err) {
    handleError(res, err)
  }
}

export default {
  getByEmail,
  getById,
  getProfile,
  getAll,
  update,
  delete: deleteUser,
  addPrivilege,
}
