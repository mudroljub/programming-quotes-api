import jwt from 'jsonwebtoken'

const { JWT_SECRET } = process.env

const createToken = user => {
  const tokenData = { id: user.id, privilege: user.privilege }
  const token = jwt.sign(tokenData, JWT_SECRET, { expiresIn: '24h' })
  return token
}

export default {
  createToken
}
