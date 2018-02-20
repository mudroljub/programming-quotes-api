const mongoose = require('mongoose')
let Schema = mongoose.Schema

let userSchema = Schema({
    name: {
        type: String,
        unique: true,
        trim: true,
        required: true
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