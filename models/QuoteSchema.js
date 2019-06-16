const mongoose = require('mongoose')

const Quote = {
  author: {
    type: String,
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
    default: 0,
  }
}

const QuotesSchema = mongoose.Schema(Quote)

module.exports = QuotesSchema
