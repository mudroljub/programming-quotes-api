const mongoose = require('mongoose')
const Quote = require('./schemas/Quote')

const quotesSchema = mongoose.Schema(Quote)

module.exports = mongoose.model('ProgrammingQuote', quotesSchema, 'programmingQuotes')
