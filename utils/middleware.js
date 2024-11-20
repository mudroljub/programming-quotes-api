import jwt from 'jsonwebtoken'

const { JWT_SECRET } = process.env

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).send({ message: 'No token.' })

  try {
    const data = jwt.verify(token, JWT_SECRET)
    req.user = data
    next()
  } catch (err) {
    res.status(403).json({ message: 'TOKEN_ERROR.', error: err.message })
  }
}

const validatePrivilege = level => async(req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).send({ message: 'No token.' })

  try {
    const { privilege } = jwt.verify(token, JWT_SECRET)

    if (privilege < level)
      return res.status(403).json({ message: 'Not authorized.' })

    next()
  } catch (err) {
    res.status(403).json({ message: 'TOKEN_ERROR.', error: err.message })
  }
}

const validateUser = validatePrivilege(1)

const validateAdmin = validatePrivilege(3)

export {
  authenticate,
  validateUser,
  validateAdmin,
}
