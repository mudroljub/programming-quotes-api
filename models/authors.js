const mongoose = require('mongoose')
let Schema = mongoose.Schema

let authorSchema = Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
})

let Author = mongoose.model('Author', authorSchema)

module.exports = Author
