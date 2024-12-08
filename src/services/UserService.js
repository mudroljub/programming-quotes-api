import bcrypt from 'bcryptjs'

import User from '../models/User.js'
import UserResponseDTO from '../dto/UserResponseDTO.js'

const getById = async id => {
  const user = await User.findById(id)
  return new UserResponseDTO(user)
}

const getAll = async() => {
  const users = await User.find()
  return users.map(user => new UserResponseDTO(user))
}

const create = async(email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = new User({ email, password: hashedPassword })
  await user.save()
  return new UserResponseDTO(user)
}

const update = async(id, updates) => {
  const user = await User.findByIdAndUpdate(id, updates, { new: true })
  return new UserResponseDTO(user)
}

const deleteUser = async id => {
  const user = await User.findByIdAndDelete(id)
  return user ? { message: 'Deleted successfully' } : { message: 'NOT_FOUND' }
}

const getByEmail = async email => {
  const user = await User.findOne({ email })
  return new UserResponseDTO(user)
}

const getMyUser = async(email, password) => {
  const user = await User.findOne({ email })

  if (user && !await bcrypt.compare(password, user.password))
    throw new Error('BAD_PASSWORD')

  return user && new UserResponseDTO(user)
}

const addPrivilege = async(id, privilege) => {
  const user = await User.findById(id)
  if (!user) return null

  user.privilege = privilege
  await user.save()
  return new UserResponseDTO(user)
}

const updateVoted = (userId, quoteId) =>
  User.updateOne({ _id: userId }, { $addToSet: { voted: quoteId } })

const findOrCreate = async(email, password) =>
  await getMyUser(email, password) || await create(email, password)

export default {
  getById,
  update,
  delete: deleteUser,
  getAll,
  getByEmail,
  findOrCreate,
  addPrivilege,
}
