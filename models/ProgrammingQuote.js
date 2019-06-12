const {model} = require('mongoose')
const QuotesSchema = require('./schemas/Quote')

module.exports = model('ProgrammingQuote', QuotesSchema, 'programmingQuotes')
