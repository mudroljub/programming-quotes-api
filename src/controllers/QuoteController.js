import Quote from '../models/Quote.js'
import User from '../models/User.js'
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
    res.send(await QuoteService.getAll())
  } catch (err) {
    handleError(res, err)
  }
}

const getById = async(req, res) => {
  try {
    const quote = await QuoteService.getById(req.params.id)
    res.send(quote)
  } catch (err) {
    handleError(res, err)
  }
}

// const readByLang = async(req, res) => {
//   const { lang } = req.params
//   console.log(lang)
// }

// const readByPage = async(req, res) => {
//   const { pageNumber } = req.params
//   const pageSize = 20

//   try {
//     const quotes = await Quote
//       .find()
//       .skip((pageNumber - 1) * pageSize)
//       .limit(pageSize)
//       .select({ author: 1, text: 1, rating: 1 })
//     res.send(quotes)
//   } catch (err) {
//     handleError(res, err)
//   }
// }

const random = async(req, res) => {
  try {
    const quote = await QuoteService.getRandom()
    res.send(quote)
  } catch (err) {
    handleError(res, err)
  }
}

// const randomByLang = async(req, res) => {
//   const { lang } = req.params
//   const query = { [lang]: { $ne: '' } }

//   try {
//     const n = await Quote.countDocuments(query)
//     const rand = Math.floor(Math.random() * n)
//     const quote = await Quote
//       .findOne(query)
//       .skip(rand)
//     res.send(quote)
//   } catch (err) {
//     handleError(res, err)
//   }
// }

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

// const vote = async(req, res) => {
//   const { quoteId, newVote } = req.body
//   const { user } = res.locals
//   if (newVote > 5 || newVote < 1) return res.status(400).send({ message: 'Invalid vote' })

//   try {
//     const quote = await Quote.findById(quoteId)
//     const { rating, numberOfVotes } = quote
//     const newRating = (rating * numberOfVotes + Number(newVote)) / (numberOfVotes + 1)
//     quote.rating = newRating.toFixed(1)
//     await quote.save()
//     if (user)
//       await User.updateOne({ _id: user._id }, { $addToSet: { voted: quoteId } })

//     res.send({ message: 'SUCCESS_SAVED', quote })
//   } catch (err) {
//     handleError(res, err)
//   }
// }

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
  getAll,
  getById,
  // readByLang,
  // readByPage,
  random,
  // randomByLang,
  update,
  vote,
  delete: deleteQuote,
}
