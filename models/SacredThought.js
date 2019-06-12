const mongoose = require('mongoose')
const QuotesSchema = require('./schemas/Quote')

module.exports = mongoose.model('SacredThought', QuotesSchema, 'sacredThoughts')
