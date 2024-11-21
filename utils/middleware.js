import jwt from 'jsonwebtoken'

const { JWT_SECRET } = process.env

const validatePrivilege = level => async(req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).send({ message: 'No token.' })

  try {
    const data = jwt.verify(token, JWT_SECRET)

    if (data.privilege < level)
      return res.status(403).json({ message: 'Not authorized.' })

    req.user = data
    next()
  } catch (err) {
    res.status(403).json({ message: 'TOKEN_ERROR.', error: err.message })
  }
}

const authenticate = validatePrivilege(1)

const authorizeAdmin = validatePrivilege(3)

export {
  authenticate,
  authorizeAdmin,
}
