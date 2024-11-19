import { Schema, model } from 'mongoose'

const QuotesSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
  },
  author: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100,
  },
  en: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 800,
  },
  sr: {
    type: String,
    trim: true,
    minlength: 5,
    maxlength: 800,
  },
  source: {
    type: String,
    trim: true,
    maxlength: 255,
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