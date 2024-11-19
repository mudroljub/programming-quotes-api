import { Schema, model } from 'mongoose'

const QuotesSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
  },
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
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  numberOfVotes: {
    type: Number,
    min: 0,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
})

QuotesSchema.set('toJSON', { getters: true }) // enable getters

export default model('Quote', QuotesSchema)