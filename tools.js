require('dotenv').config()
const fs = require('fs')
const mongoose = require('mongoose')
const {model} = require('mongoose')

const {mongoUri} = require('./config/db')
const QuotesSchema = require('./models/QuoteSchema')
const Quote = model('Quote', QuotesSchema, 'svetemisli')
// const citati = require('./citati.json')

mongoose.connect(mongoUri, { useNewUrlParser: true })
mongoose.set('useCreateIndex', true)

Quote.find()
  .then(res => {
    const filtrirano = res
      .filter(q => q.ms)
      .sort((a, b) => b.ms.length - a.ms.length)
      .map(({ ms }) => ms)
      .join('\n\n')
    fs.writeFileSync('citati.txt', filtrirano)
  })

// citati.forEach(q => {
//   Quote.findOne({_id: q._id}, (err, obj) => {
//     obj.sr = q.sr
//     obj.ms = q.ms
//     obj.save()
//   })
// })
