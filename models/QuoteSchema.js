const mongoose = require('mongoose')

const Quote = {
  author: {
    type: String, // Schema.Types.ObjectId,
    // ref: 'Author',
    required: true,
    trim: true,
  },
  en: {
    type: String,
    required: true,
    trim: true
  },
  sr: {
    type: String,
    trim: true,
  },
  source: {
    type: String,
    trim: true,
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
    default: 0,
  }
}

const QuotesSchema = mongoose.Schema(Quote)

module.exports = QuotesSchema
