const mongoose = require('mongoose')
const Schema = mongoose.Schema

const authorSchema = Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  }
})

module.exports = mongoose.model('Author', authorSchema)
