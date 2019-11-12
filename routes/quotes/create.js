module.exports =  (req, res) => {
  const { Quote, user } = res.locals

  Quote.create({...req.body, addedBy: user._id }, (err, quote) => {
    if (err) return res.status(500).send(err)
    res.send({message: 'SUCCESS_SAVED', quote})
  })
}
