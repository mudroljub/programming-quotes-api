const Quote = require('../models/Quote')

exports.createQuote = (req, res) => {
  const { user } = res.locals
  const params = {...req.body}
  delete params._id // error if try to convert empty _id

  Quote.create({ ...params, addedBy: user._id }, (err, quote) => {
    if (err) return res.status(500).send(err)
    res.send({message: 'SUCCESS_SAVED', quote})
  })
}

exports.getAllQuotes = async(req, res) => {
  try {
    const quotes = await Quote.find().select()
    res.send(quotes)
  } catch (e) {
    res.send('SERVER_ERROR', e.message)
  }
}

exports.getQuoteById = (req, res) => {
  const { _id } = req.params

  Quote.findById(_id, (err, quote) => {
    if (err) return console.error(err)
    res.send(quote)
  })
}

exports.updateQuote = (req, res) => {
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

exports.deleteQuote = (req, res) => {
  const {_id} = req.body

  Quote.findOneAndRemove({_id}, err => {
    if (err) throw err
    res.send('QUOTE_DELETED')
  })
}
