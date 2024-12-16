import jwt from 'jsonwebtoken'

const validatePrivilege = level => async(req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).send({ message: 'NO_TOKEN.' })

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET)

    if (data.privilege < level)
      return res.status(403).json({ message: 'NO_PRIVILEGE' })

    req.user = data
    next()
  } catch (err) {
    res.status(403).json({ message: 'FORBIDDEN.', error: err.message })
  }
}

const allowSelfOrAdmin = (req, res, next) => {
  const { id } = req.params
  const { user } = req

  if (!user) return res.status(401).json({ message: 'NO_USER' })

  if (user.id === id || user.privilege > 2)
    next()

  return res.status(403).json({ message: 'NOT SELF OR ADMIN' })
}

const authenticate = validatePrivilege(0)
const authorizeUser = validatePrivilege(1)
const authorizeEditor = validatePrivilege(2)
const authorizeAdmin = validatePrivilege(3)

export {
  authenticate,
  authorizeUser,
  authorizeEditor,
  authorizeAdmin,
  allowSelfOrAdmin,
}
