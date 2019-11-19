module.exports =  (req, res) => {
  const { Quote, user } = res.locals
  const params = {...req.body}
  delete params._id // error if try to convert empty _id

  Quote.create({ ...params, addedBy: user._id }, (err, quote) => {
    if (err) return res.status(500).send(err)
    res.send({message: 'SUCCESS_SAVED', quote})
  })
}
