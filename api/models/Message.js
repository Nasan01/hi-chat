const mongoose = require("mongoose")
const { Schema } = mongoose

const MessageSchema = new Schema({

  conversation: {
    type: mongoose.Types.ObjectId,
    ref: "conversations",
  },

  to: {
    type: mongoose.Types.ObjectId,
    ref: "users"
  },

  from: {
    type: mongoose.Types.ObjectId,
    ref: "users"
  },

  body: {
    type: String,
    required: true
  },

  date: {
    type: String,
    default: Date.now
  },


})

module.exports = Message = mongoose.model("messages", MessageSchema)
