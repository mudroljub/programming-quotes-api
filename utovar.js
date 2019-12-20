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

// const filtrirano = citati
//   .filter(q => q.author == 'Isus' && (q.source.includes('Jovanu') || q.source.includes('Mateju') || q.source.includes('Luki') || q.source.includes('Marku')))
//   .map(({_id, sr, ms, source}) => ({_id, ms, source}))
// fs.writeFileSync('filtrirano.json', JSON.stringify(filtrirano, null, 2))

// Quote.find()
//   .then(res => {
//     const filtrirano = res
//       // .filter(q => q.author == 'Isus' && (q.source.includes('Tomi')))
//       .map(({_id, ms, source}) => ({_id, ms, source }))
//     fs.writeFileSync('citati.json', JSON.stringify(filtrirano, null, 2))
//   })

citati.forEach(q => {
  Quote.findOne({_id: q._id}, (err, obj) => {
    obj.ms = q.ms
    obj.save()
  })
})
