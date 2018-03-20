const port = process.env.PORT || 5000

const domain = process.env.NODE_ENV === 'development'
  ? `http://localhost:${port}`
  : 'https://baza-podataka.herokuapp.com'

const clientDomain = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000'
  : 'https://skolakoda.org/programming-quotes'

module.exports = {
  port,
  domain,
  clientDomain
}
