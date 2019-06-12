const mongoose = require('mongoose')
const QuotesSchema = require('./schemas/Quote')

module.exports = mongoose.model('ProgrammingQuote', QuotesSchema, 'programmingQuotes')
