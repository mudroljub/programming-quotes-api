const mongoose = require('mongoose')
let Schema = mongoose.Schema

let quotesSchema = Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    },
    sr: {
        type: String,
        unique: true
    },
    source: {
        type: String,
        trim: true
    },
    en: {
        type: String,
        unique: true
    },
    howManuVotes: {
        type: Number,
        default: 0
    },
    rate: {
        type: Number,
        default: 0
    }
})

let Quote = mongoose.model('Quote', quotesSchema)

module.exports = Quote
