import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
    maxlength: 100,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    match: /\S+@\S+\.\S+/,
    index: true,
    maxlength: 100,
  },
  password: { 
    type: String, 
    required: true 
  },
  accessToken: {
    type: String,
    unique: true
  },
  voted: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Quote',
      unique: true
    }
  ],
  admin: {
    type: Boolean,
    default: false
  },
  memberSince: {
    type: Date,
    default: new Date()
  }
})

export default model('User', userSchema)
