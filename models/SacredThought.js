const {model} = require('mongoose')
const QuotesSchema = require('./QuoteSchema')

module.exports = model('SacredThought', QuotesSchema, 'sacredThoughts')
