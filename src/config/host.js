const port = process.env.PORT || 5000

const domain = process.env.NODE_ENV === 'development'
  ? `http://localhost:${port}`
  : 'https://programming-quotes-api.azurewebsites.net'

const clientDomain = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000'
  : 'https://programming-quotes-one.vercel.app'

export {
  port,
  domain,
  clientDomain,
}
