import Quote from '../models/Quote.js'
import { NotFoundError } from '../utils.js'

const create = async(quote, userId) => {
  const newQuote = await Quote.create({ ...quote, addedBy: userId })
  return newQuote
}

const getAll = () => Quote.find()

const getByQuery = async({ page, quotesPerPage, filter } = {}) => {
  const start = (page - 1) * quotesPerPage

  const quotes = await Quote.find(filter)
    .skip(start)
    .limit(quotesPerPage)

  return quotes
}

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

const update = async(id, values) => {
  const quote = await Quote.findByIdAndUpdate(id, values, { new: true, runValidators: true })
  if (!quote) throw new NotFoundError('Quote not found')

  return quote
}

const deleteQuote = async id => {
  const quote = await Quote.findByIdAndDelete(id)
  if (!quote) throw new NotFoundError('Quote not found')

  return quote
}

const applyVote = async(quoteId, newVote) => {
  const quote = await Quote.findByIdAndUpdate(
    quoteId,
    {
      $inc: { numberOfVotes: 1 },
      $set: { rating: { $round: [{ $add: ['$rating', (newVote - '$rating') / '$numberOfVotes'] }, 1] } },
    },
    { new: true }
  )

  if (!quote) throw new Error('Quote not found')
  return quote
}

export default {
  create,
  getAll,
  getByQuery,
  getById,
  getRandom,
  applyVote,
  update,
  delete: deleteQuote,
}
