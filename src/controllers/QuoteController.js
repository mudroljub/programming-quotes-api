import QuoteCreateDTO from '../dto/QuoteCreateDTO.js'
import { handleError } from '../utils.js'
import QuoteService from '../services/QuoteService.js'
import UserService from '../services/UserService.js'

const create = async(req, res) => {
  try {
    const quoteDTO = new QuoteCreateDTO(req.body)
    const quote = await QuoteService.create(quoteDTO, req.user.id)
    res.json(quote)
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

const getByQuery = async(req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const quotesPerPage = parseInt(req.query.quotesPerPage) || 20
    const { author } = req.query
    const filter = author ? { author } : {}

    const quotes = await QuoteService.getByQuery({ page, quotesPerPage, filter })

    res.json(quotes)
  } catch (err) {
    handleError(res, err)
  }
}

const getQuotes = (req, res) => {
  if (Object.keys(req.query).length)
    return getByQuery(req, res)
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
  try {
    const quoteDTO = new QuoteCreateDTO(req.body)
    const quote = await QuoteService.update(req.params.id, quoteDTO)
    res.json(quote)
  } catch (err) {
    handleError(res, err)
  }
}

const vote = async(req, res) => {
  const vote = Number(req.body.newVote)

  if (isNaN(vote) || vote > 5 || vote < 1)
    return res.status(400).send({ message: 'INVALID_VOTE' })

  if (!req.user)
    return res.status(400).send({ message: 'NO_USER' })

  try {
    const quote = await QuoteService.applyVote(req.params.id, vote, req.user)
    res.json(quote)
  } catch (err) {
    handleError(res, err)
  }
}

const favorite = async(req, res) => {
  if (!req.user)
    return res.status(400).send({ message: 'NO_USER' })

  try {
    await UserService.addToFavorites(req.user.id, req.params.id)
    res.json({ message: 'SUCCESS' })
  } catch (err) {
    handleError(res, err)
  }
}

const deleteQuote = async(req, res) => {
  try {
    await QuoteService.delete(req.params.id)
    res.json({ message: 'QUOTE_DELETED' })
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
  favorite,
}
