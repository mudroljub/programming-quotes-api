const mongoose = require('mongoose')

const Quote = {
  author: {
    type: String,
    required: true,
    trim: true,
  },
  en: {
    type: String,
    required() { return !this.sr },
    trim: true
  },
  sr: {
    type: String,
    required() { return !this.en },
    trim: true,
  },
  ms: {
    type: String,
    trim: true,
  },
  source: {
    type: String,
    trim: true,
  },
  wiki: {
    type: String,
    trim: true,
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  numberOfVotes: {
    type: Number,
    min: 0,
    // default: 0,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    // default: 0,
  },
  tags: {
    type: [{ type: String }],
    set(str = '') {
      return str.split(',').map(s => s.trim())
    },
    get(arr = []) {
      return arr.join(', ')
    }
  },
}

const QuotesSchema = mongoose.Schema(Quote)

QuotesSchema.set('toJSON', { getters: true }) // enable getters

module.exports = QuotesSchema
