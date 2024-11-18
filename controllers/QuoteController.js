const Quote = require('../models/Quote')
const User = require('../models/User')

exports.create = (req, res) => {
  const { user } = res.locals
  const params = {...req.body}
  delete params._id // error if try to convert empty _id

  Quote.create({ ...params, addedBy: user._id }, (err, quote) => {
    if (err) return res.status(500).send(err)
    res.send({message: 'SUCCESS_SAVED', quote})
  })
}

exports.getAll = async(req, res) => {
  try {
    const quotes = await Quote.find().select()
    res.send(quotes)
  } catch (e) {
    res.send('SERVER_ERROR', e.message)
  }
}

exports.getById = (req, res) => {
  const { _id } = req.params

  Quote.findById(_id, (err, quote) => {
    if (err) return console.error(err)
    res.send(quote)
  })
}

exports.readByLang = (req, res) => {
  const { lang } = req.params
  Quote
    .find({ [lang]: { $ne: '' } })
    .select({ author: 1, [lang]: 1, rating: 1 })
    .then(quotes => res.send(quotes))
    .catch(e => res.send('SERVER_ERROR', e.message))
}

exports.readByPage = async(req, res) => {
  const { pageNumber } = req.params
  const pageSize = 20

  const quotes = await Quote
    .find()
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .select({ author: 1, en: 1, sr: 1, rating: 1 })
  res.send(quotes)
}

exports.random = (req, res) => {
  Quote.estimatedDocumentCount().exec((err, count) => {
    const rand = Math.floor(Math.random() * count)
    Quote
      .findOne()
      .select({ author: 1, en: 1}) // '_id': 0
      .skip(rand)
      .exec((err, quote) => res.send(quote))
  })
}

exports.randomByLang = (req, res) => {
  const { lang } = req.params
  const query = { [lang]: { $ne: '' } }

  Quote
    .countDocuments(query)
    .exec((err, n) => {
      const rand = Math.floor(Math.random() * n)
      Quote
        .findOne(query)
        // .select({ author: 1, [lang]: 1 })
        .skip(rand)
        .exec((err, quote) => res.send(quote))
    })
}

exports.update = (req, res) => {
  const {_id} = req.body

  Quote.findById(_id, (err, quote) => {
    if (err) return console.error(err)
    quote.set({...req.body})
    quote.save(err => {
      if (err) return console.error(err)
      res.send({message: 'SUCCESS_SAVED', quote})
    })
  })
}

exports.vote = async(req, res) => {
  const {quoteId, newVote} = req.body
  const { user } = res.locals
  if (newVote > 5 || newVote < 1) return res.status(400).send({message: 'Invalid vote'})

  try {
    const quote = await Quote.findById(quoteId)
    const { rating, numberOfVotes } = quote
    const newRating = (rating * numberOfVotes + Number(newVote)) / (numberOfVotes + 1)
    quote.rating = newRating.toFixed(1)
    quote.save(err => {
      if (err) return res.status(500).send(err.message)
      if (user) User.update({_id: user._id}, {$addToSet: {voted: quoteId}})
      res.send({message: 'SUCCESS_SAVED', quote})
    })
  } catch (e) {
    res.send({message: e.message })
  }
}

exports.delete = (req, res) => {
  const {_id} = req.body

  Quote.findOneAndRemove({_id}, err => {
    if (err) throw err
    res.send('QUOTE_DELETED')
  })
}
