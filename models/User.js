const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = Schema({
  nameId: {
    type: String,
    unique: true,
    trim: true,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  voted: [{
    type: Schema.Types.ObjectId,
    ref: 'Quote'
  }],
  admin: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('User', userSchema)
