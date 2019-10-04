module.exports = (req, res) => {
  const {_id, en, sr, author, tags, source} = req.body
  const { Quote } = res.locals

  Quote.findById(_id, (err, quote) => {
    const tagArray = tags.split(',').map(s => s.trim())
    
    if (err) return console.error(err)
    quote.set({ en, sr, author, source, tags: tagArray })
    quote.save(err => {
      if (err) return console.error(err)
      res.send({message: 'SUCCESS_SAVED', quote})
    })
  })
}
