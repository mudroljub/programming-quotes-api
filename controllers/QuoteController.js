const Quote = require('../models/Quote')
const User = require('../models/User')

exports.create = async(req, res) => {
  const { user } = res.locals
  const params = { ...req.body }
  delete params._id // error if try to convert empty _id

  try {
    const quote = await Quote.create({ ...params, addedBy: user._id })
    res.send({ message: 'SUCCESS_SAVED', quote })
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.getAll = async(req, res) => {
  try {
    const quotes = await Quote.find().select()
    res.send(quotes)
  } catch (e) {
    res.send('SERVER_ERROR', e.message)
  }
}

exports.getById = async(req, res) => {
  const { _id } = req.params

  try {
    const quote = await Quote.findById(_id)
    res.send(quote)
  } catch (err) {
    console.error(err)
    res.send('SERVER_ERROR', err.message)
  }
}

exports.readByLang = async(req, res) => {
  const { lang } = req.params
  try {
    const quotes = await Quote
      .find({ [lang]: { $ne: '' } })
      .select({ author: 1, [lang]: 1, rating: 1 })
    res.send(quotes)
  } catch (e) {
    res.send('SERVER_ERROR', e.message)
  }
}

exports.readByPage = async(req, res) => {
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
    res.send('SERVER_ERROR', err.message)
  }
}

exports.random = async(req, res) => {
  try {
    const count = await Quote.estimatedDocumentCount()
    const rand = Math.floor(Math.random() * count)
    const quote = await Quote
      .findOne()
      .select({ author: 1, en: 1 })
      .skip(rand)
    res.send(quote)
  } catch (err) {
    res.send(err)
  }
}

exports.randomByLang = async(req, res) => {
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
    res.send('SERVER_ERROR', err.message)
  }
}

exports.update = async(req, res) => {
  const { _id } = req.body

  try {
    const quote = await Quote.findById(_id)
    quote.set({ ...req.body })
    await quote.save()
    res.send({ message: 'SUCCESS_SAVED', quote })
  } catch (err) {
    res.send('SERVER_ERROR', err.message)
  }
}

exports.vote = async(req, res) => {
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
    res.send('SERVER_ERROR', e.message)
  }
}

exports.delete = async(req, res) => {
  const { _id } = req.body

  try {
    await Quote.findOneAndRemove({ _id })
    res.send('QUOTE_DELETED')
  } catch (err) {
    res.send('SERVER_ERROR', err.message)
  }
}
