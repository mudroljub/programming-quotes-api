require('dotenv').config()
const fs = require('fs')
const mongoose = require('mongoose')
const {model} = require('mongoose')

const {mongoUri} = require('./config/db')
const QuotesSchema = require('./models/QuoteSchema')
const Quote = model('Quote', QuotesSchema, 'svetemisli')
const azurirano = require('./backup/azurirano.json')

mongoose.connect(mongoUri, { useNewUrlParser: true })
mongoose.set('useCreateIndex', true)

console.log(azurirano)

// Quote.find()
//   .then(res => {
//     console.log(res)
//     fs.writeFileSync('azurirano.json', JSON.stringify(res))
//   })

// utovar
// azurirano.forEach(q => {
//   console.log(q)
//   // if (q.source || q.wiki)
//   Quote.findByIdAndUpdate(q.id, {
//     $set: {source: q.source, wiki: q.wiki}
//   }, {useFindAndModify: false}, res => console.log(res))
// })
