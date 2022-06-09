const mongoose = require("mongoose")
const { Schema } = mongoose

const ConversationSchema = new Schema({

  recipients: [{ type: mongoose.Types.ObjectId, ref: "users" }],
  
  lastMessage: {
    type: String,
  },
  
  date: {
    type: String,
    default: Date.now
  }

})

module.exports = Conversation = mongoose.model("conversations", ConversationSchema)
