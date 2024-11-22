const supportedLanguages = ['en', 'sr', 'sh']

export const langMiddleware = (req, res, next) => {
  const { lang } = req.params
  if (!supportedLanguages.includes(lang))
    return res.status(404).send('Language not supported')

  next()
}