export const handleError = (res, err) => {
  if (err.name === 'ValidationError')
    res.status(400).json({ message: 'BAD_DATA', error: err.message })
  else
    res.status(500).send({ message: 'SERVER_ERROR', error: err.message })
}