import Quote from '../models/Quote.js'
import QuoteCreateDTO from '../dto/QuoteCreateDTO.js'
import { handleError } from '../utils.js'
import QuoteService from '../services/QuoteService.js'
import UserService from '../services/UserService.js'

const create = async(req, res) => {
  try {
    const quoteDTO = new QuoteCreateDTO(req.body)
    const quote = await QuoteService.create(quoteDTO, req.user.id)
    res.send({ message: 'SUCCESS_SAVED', quote })
  } catch (err) {
    handleError(res, err)
  }
}

const getAll = async(req, res) => {
  try {
    res.json(await QuoteService.getAll())
  } catch (err) {
    handleError(res, err)
  }
}

const getByPage = async(req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const numPerPage = parseInt(req.query.numPerPage) || 20
    const quotes = await QuoteService.getByPage(page, numPerPage)
    res.json(quotes)
  } catch (err) {
    handleError(res, err)
  }
}

const getQuotes = (req, res) => {
  if (req.query.page) return getByPage(req, res)
  return getAll(req, res)
}

const getById = async(req, res) => {
  try {
    const quote = await QuoteService.getById(req.params.id)
    res.json(quote)
  } catch (err) {
    handleError(res, err)
  }
}

const random = async(req, res) => {
  try {
    const quote = await QuoteService.getRandom()
    res.json(quote)
  } catch (err) {
    handleError(res, err)
  }
}

const update = async(req, res) => {
  const { _id } = req.body
  try {
    const quote = await Quote.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
    if (!quote) return res.status(404).send({ message: 'NOT_FOUND' })
    res.json({ message: 'SUCCESS_SAVED', quote })
  } catch (err) {
    handleError(res, err)
  }
}

const vote = async(req, res) => {
  const { quoteId, newVote } = req.body
  const vote = Number(newVote)

  if (isNaN(vote) || vote > 5 || vote < 1)
    return res.status(400).send({ message: 'INVALID_VOTE' })

  if (!req.user)
    return res.status(400).send({ message: 'NO_USER' })

  try {
    const quote = await QuoteService.applyVote(quoteId, vote, req.user)
    await UserService.updateVoted(req.user.id, quoteId)

    res.json({ message: 'SUCCESS_SAVED', quote })
  } catch (err) {
    handleError(res, err)
  }
}

const deleteQuote = async(req, res) => {
  try {
    await QuoteService.delete(req.params.id)
    res.send({ message: 'QUOTE_DELETED' })
  } catch (err) {
    handleError(res, err)
  }
}

export default {
  create,
  getQuotes,
  getById,
  random,
  update,
  vote,
  delete: deleteQuote,
}
