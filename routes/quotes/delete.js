module.exports = (req, res) => {
  const {_id} = req.body
  const { Quote } = res.locals

  Quote.findOneAndRemove({_id}, (err) => {
    if (err) throw err
    res.send('QUOTE_DELETED')
  })
}
