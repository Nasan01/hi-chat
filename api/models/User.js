const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const { Schema } = mongoose

const UserSchema = new Schema({

  fullname: {
    type: String
  },

  email: {
    type: String,
    unique: [true, "User with this email already exist ! Try another one!"],
    required: [true, "Email is required !"],
  },

  username: {
    type: String,
    unique: [true, "User with this username already exist ! Try another one !"],
    required: [true, "You Should have an username !"],
  },

  password: {
    type: String,
    required: [true, "Password is required !"]
  },

  picture: {
    type: String
  },

  date: {
    type: String,
    default: Date.now
  }

})

UserSchema.pre("save", async function(next) {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

module.exports = User = mongoose.model("users", UserSchema)
