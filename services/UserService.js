import bcrypt from 'bcryptjs'
import User from '../models/User.js'

const getUser = async (email) => {
  return await User.findOne({ email })
}

const getMyUser = async (email, password) => {
  const user = await User.findOne({ email })
  if (user && !await bcrypt.compare(password, user.password))
    throw new Error('BAD_PASSWORD')
  return user
}

const createUser = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10)
  return new User({ email, password: hashedPassword }).save()
}

const findOrCreateUser = async (email, password) => 
  (await getMyUser(email, password)) || createUser(email, password)

export default {
  getUser,
  getMyUser,
  createUser,
  findOrCreateUser,
}
