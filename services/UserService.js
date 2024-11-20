import bcrypt from 'bcryptjs'

import User from '../models/User.js'
import UserResponseDTO from '../dto/UserResponseDTO.js'

const getByEmail = async email => {
  const user = await User.findOne({ email })
  return new UserResponseDTO(user)
}

const getById = async id => {
  const user = await User.findById(id)
  return new UserResponseDTO(user)
}

const getMyUser = async(email, password) => {
  const user = await User.findOne({ email })

  if (user && !await bcrypt.compare(password, user.password))
    throw new Error('BAD_PASSWORD')

  return user && new UserResponseDTO(user)
}

const createUser = async(email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = new User({ email, password: hashedPassword })
  await user.save()
  return new UserResponseDTO(user)
}

const findOrCreateUser = async(email, password) =>
  await getMyUser(email, password) || await createUser(email, password)

export default {
  getByEmail,
  getMyUser,
  createUser,
  findOrCreateUser,
  getById,
}
