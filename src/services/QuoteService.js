import mongoose from 'mongoose'
import Quote from '../models/Quote.js'

const create = async(quote, userId) => {
  const newQuote = await Quote.create({ ...quote, addedBy: userId })
  return newQuote
}

const getAll = () => Quote.find().select()

const getById = async id => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new Error('Invalid ID format')

    const quote = await Quote.findById(id)
    if (!quote)
      throw new Error('Quote not found')

    return quote
  } catch (err) {
    throw err
  }
}

export default {
  create,
  getAll,
  getById,
}
