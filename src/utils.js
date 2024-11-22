export class NotFoundError extends Error {
  constructor(message) {
    super(message)
    this.name = 'NotFoundError'
    this.status = 404
  }
}

export const handleError = (res, err) => {
  if (err.name === 'ValidationError')
    res.status(400).json({ message: 'BAD_DATA', error: err.message })
  if (err.name === 'NotFoundError')
    res.status(404).json({ message: 'NOT_FOUND', error: err.message })
  else
    res.status(500).send({ message: 'SERVER_ERROR', error: err.message })
}
