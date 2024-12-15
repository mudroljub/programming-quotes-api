import jwt from 'jsonwebtoken'

const { JWT_SECRET } = process.env

const createToken = (id, privilege) => {
  const tokenData = { id, privilege }
  const token = jwt.sign(tokenData, JWT_SECRET, { expiresIn: '24h' })
  return token
}

export default {
  createToken
}
