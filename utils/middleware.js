const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'Unauthorized' })

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET) // Dobijamo podatke iz tokena
    console.log(data)
    req.user = data
    next()
  } catch (e) {
    res.status(403).json({ error: 'Invalid token' })
  }
}

const validatePrivilege = (level) => async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(403).send({ message: 'No token.' })

  try {
    const { privilege } = jwt.verify(token, JWT_SECRET)

    if (privilege < level)
      return res.status(403).json({ message: 'Not authorized.' })

    next()
  } catch (err) {
    res.status(403).json({ message: 'Bad token.', error: err.message })
  }
}

const validateUser = validatePrivilege(1)

const validateAdmin = validatePrivilege(3)

export {
  authenticate,
  validateUser,
  validateAdmin,
}
