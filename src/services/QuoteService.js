import Quote from '../models/Quote.js'

const create = async(quote, userId) => {
  const newQuote = await Quote.create({ ...quote, addedBy: userId })
  return newQuote
}

const getAll = () => Quote.find().select()

const getById = async id => {
  const quote = await Quote.findById(id)
  if (!quote)
    throw new Error('Quote not found')
  return quote
}

const getRandom = async() => {
  const count = await Quote.estimatedDocumentCount()
  const quote = await Quote
    .findOne()
    .skip(Math.floor(Math.random() * count))
  return quote
}

export default {
  create,
  getAll,
  getById,
  getRandom,
}
