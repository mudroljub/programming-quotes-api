const mongoose = require('mongoose')
const Schema = mongoose.Schema

const quotesSchema = Schema({
  author: {
    type: String, // Schema.Types.ObjectId,
    ref: 'Author',
    required: true
  },
  en: {
    type: String,
    sparse: true,
    unique: true,
    trim: true
  },
  sr: {
    type: String,
    trim: true,
    sparse: true,
    unique: true,
  },
  source: {
    type: String,
    trim: true
  },
  numberOfVotes: {
    type: Number,
    min: 0,
    default: 0
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  }
})

module.exports = mongoose.model('Quote', quotesSchema)
