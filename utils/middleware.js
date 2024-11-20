export const authenticate = (req, res, next) => {
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
