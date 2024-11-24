import mongoose, { Schema, model } from 'mongoose'

const QuotesSchema = new Schema({
  author: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100,
  },
  text: {
    type: String,
    required: true,
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

const Quote = mongoose?.models?.Quote || model('Quote', QuotesSchema)

export default Quote