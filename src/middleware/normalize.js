const normalizeKeys = obj => {
  if (typeof obj !== 'object' || obj === null) return obj

  return Object.keys(obj).reduce((acc, key) => {
    // spušta prvo slovo
    const lowerCaseKey = key.charAt(0).toLowerCase() + key.slice(1)
    acc[lowerCaseKey] = normalizeKeys(obj[key])
    return acc
  }, {})
}

export const normalizeJsonKeys = (req, res, next) => {
  if (req.body)
    req.body = normalizeKeys(req.body)
  next()
}

export function normalizeQueryParams(req, res, next) {
  if (req.query.author)
    req.query.author = req.query.author.replace(/_/g, ' ')

  next()
}
