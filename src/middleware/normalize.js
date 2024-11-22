const normalizeKeys = obj => {
  if (typeof obj !== 'object' || obj === null) return obj

  return Object.keys(obj).reduce((acc, key) => {
    // spusti samo prvo slovo ključa
    const lowerCaseKey = key.charAt(0).toLowerCase() + key.slice(1)
    acc[lowerCaseKey] = normalizeKeys(obj[key])
    return acc
  }, {})
}

export const normalizeRequestBody = (req, res, next) => {
  if (req.body)
    req.body = normalizeKeys(req.body)

  next()
}

export default normalizeRequestBody
