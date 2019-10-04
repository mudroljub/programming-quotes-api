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
  source: {
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
    default: 0,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  tags: {
    type: [{ type: String }],
    get(arr) {
      return arr.join(', ')
    }
  },
}

const QuotesSchema = mongoose.Schema(Quote)

QuotesSchema.set('toJSON', { getters: true }) // enable getters

module.exports = QuotesSchema
