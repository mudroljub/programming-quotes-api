import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    required: true,
    match: /\S+@\S+\.\S+/,
    unique: true,
    trim: true,
    maxlength: 100,
  },
  password: {
    type: String,
    trim: true,
    required: true,
    maxlength: 100,
  },
  name: {
    type: String,
    trim: true,
    maxlength: 100,
  },
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Quote',
      unique: true,
    }
  ],
  privilege: {
    type: Number,
    default: 0, // 0. unverified user, 1. verified user, 2. editor, 3. admin
    max: 3,
  },
  memberSince: {
    type: Date,
    default: new Date()
  }
})

export default model('User', userSchema)
