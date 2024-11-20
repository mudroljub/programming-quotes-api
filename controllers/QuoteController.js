import Quote from '../models/Quote.js'
import User from '../models/User.js'
import QuoteCreateDTO from '../dto/QuoteCreateDTO.js'

const create = async(req, res) => {
  try {
    const quoteDTO = new QuoteCreateDTO(req.body)
    const quote = await Quote.create({ ...quoteDTO, addedBy: req.user.id })
    res.send({ message: 'SUCCESS_SAVED', quote })

  } catch (err) {
    if (err.name === 'ValidationError')
      res.status(400).json({ message: 'Validation failed', errors: err.errors })
    else
      res.status(500).send({ message: 'SERVER_ERROR', error: err.message })
  }
}

const getAll = async(req, res) => {
  try {
    const quotes = await Quote.find().select()
    res.send(quotes)
  } catch (e) {
    res.status(500).send({ message: 'SERVER_ERROR', error: e.message })
  }
}

const getById = async(req, res) => {
  const { _id } = req.params

  try {
    const quote = await Quote.findById(_id)
    res.send(quote)
  } catch (err) {
    console.error(err)
    res.status(500).send({ message: 'SERVER_ERROR', error: err.message })
  }
}

const readByLang = async(req, res) => {
  const { lang } = req.params

  try {
    const quotes = await Quote
      .find({ [lang]: { $ne: '' } })
      .select({ author: 1, [lang]: 1, rating: 1 })
    res.send(quotes)
  } catch (e) {
    res.status(500).send({ message: 'SERVER_ERROR', error: e.message })
  }
}

const readByPage = async(req, res) => {
  const { pageNumber } = req.params
  const pageSize = 20

  try {
    const quotes = await Quote
      .find()
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .select({ author: 1, en: 1, sr: 1, rating: 1 })
    res.send(quotes)
  } catch (err) {
    res.status(500).send({ message: 'SERVER_ERROR', error: err.message })
  }
}

const random = async(req, res) => {
  try {
    const count = await Quote.estimatedDocumentCount()
    const rand = Math.floor(Math.random() * count)
    const quote = await Quote
      .findOne()
      .select({ author: 1, en: 1 })
      .skip(rand)
    res.send(quote)
  } catch (err) {
    res.status(500).send({ message: 'SERVER_ERROR', error: err.message })
  }
}

const randomByLang = async(req, res) => {
  const { lang } = req.params
  const query = { [lang]: { $ne: '' } }

  try {
    const n = await Quote.countDocuments(query)
    const rand = Math.floor(Math.random() * n)
    const quote = await Quote
      .findOne(query)
      .skip(rand)
    res.send(quote)
  } catch (err) {
    res.status(500).send({ message: 'SERVER_ERROR', error: err.message })
  }
}

const update = async(req, res) => {
  const { _id } = req.body

  try {
    const quote = await Quote.findById(_id)
    quote.set({ ...req.body })
    await quote.save()
    res.send({ message: 'SUCCESS_SAVED', quote })
  } catch (err) {
    res.status(500).send({ message: 'SERVER_ERROR', error: err.message })
  }
}

const vote = async(req, res) => {
  const { quoteId, newVote } = req.body
  const { user } = res.locals
  if (newVote > 5 || newVote < 1) return res.status(400).send({ message: 'Invalid vote' })

  try {
    const quote = await Quote.findById(quoteId)
    const { rating, numberOfVotes } = quote
    const newRating = (rating * numberOfVotes + Number(newVote)) / (numberOfVotes + 1)
    quote.rating = newRating.toFixed(1)
    await quote.save()
    if (user)
      await User.updateOne({ _id: user._id }, { $addToSet: { voted: quoteId } })

    res.send({ message: 'SUCCESS_SAVED', quote })
  } catch (e) {
    res.status(500).send({ message: 'SERVER_ERROR', error: e.message })
  }
}

const deleteQuote = async(req, res) => {
  const { _id } = req.body

  try {
    await Quote.findOneAndRemove({ _id })
    res.send({ message: 'QUOTE_DELETED' })
  } catch (err) {
    res.status(500).send({ message: 'SERVER_ERROR', error: err.message })
  }
}

export default {
  create,
  getAll,
  getById,
  readByLang,
  readByPage,
  random,
  randomByLang,
  update,
  vote,
  deleteQuote
}
