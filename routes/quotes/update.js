module.exports = (req, res) => {
  const {_id, en, sr, author, tags, source} = req.body
  const { Quote } = res.locals

  Quote.findById(_id, (err, quote) => {  
    if (err) return console.error(err)
    quote.set({ en, sr, author, source, tags })
    quote.save(err => {
      if (err) return console.error(err)
      res.send({message: 'SUCCESS_SAVED', quote})
    })
  })
}
