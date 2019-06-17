const { Schema, model } = require("mongoose");
const arrayUniquePlugin = require("mongoose-unique-array");

const userSchema = Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    match: /\S+@\S+\.\S+/,
    index: true
  },
  accessToken: {
    type: String,
    unique: true
  },
  voted: [
    {
      type: Schema.Types.ObjectId,
      ref: "Quote",
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
});

userSchema.plugin(arrayUniquePlugin);

module.exports = model("User", userSchema);
