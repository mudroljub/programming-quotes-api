const mongoose = require('mongoose')
let Schema = mongoose.Schema

let userSchema = Schema({
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
