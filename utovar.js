require('dotenv').config()
const fs = require('fs')
const mongoose = require('mongoose')
const {model} = require('mongoose')

const {mongoUri} = require('./config/db')
const QuotesSchema = require('./models/QuoteSchema')
const Quote = model('Quote', QuotesSchema, 'svetemisli')
const citati = require('./citati.json')

mongoose.connect(mongoUri, { useNewUrlParser: true })
mongoose.set('useCreateIndex', true)

Quote.find()
  .then(res => {
    const filtrirano = res
      .filter(q => !q.ms)
      .map(({_id, ms, sr, source }) => ({_id, ms, sr, source }))
    fs.writeFileSync('citati.json', JSON.stringify(filtrirano, null, 2))
  })

// citati.forEach(q => {
//   Quote.findOne({_id: q._id}, (err, obj) => {
//     obj.sr = q.sr
//     obj.ms = q.ms
//     obj.save()
//   })
// })
