const Quote = {
  author: {
    type: String, // Schema.Types.ObjectId,
    // ref: 'Author',
    required: true,
    trim: true,
  },
  en: {
    type: String,
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

module.exports = Quote
