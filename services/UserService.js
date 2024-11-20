import bcrypt from 'bcryptjs'

import User from '../models/User.js'
import UserResponseDTO from '../dto/UserResponseDTO.js'

const getByEmail = async email => {
  const user = await User.findOne({ email })
  return new UserResponseDTO(user)
}

const getById = async id => await User.findById(id)

const getMyUser = async(email, password) => {
  const user = await User.findOne({ email })
  if (user && !await bcrypt.compare(password, user.password))
    throw new Error('BAD_PASSWORD')
  return new UserResponseDTO(user)
}

const createUser = async(email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10)
  return new User({ email, password: hashedPassword }).save()
}

const findOrCreateUser = async(email, password) =>
  (await getMyUser(email, password)) || createUser(email, password)

export default {
  getByEmail,
  getMyUser,
  createUser,
  findOrCreateUser,
  getById,
}
