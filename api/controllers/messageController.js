const mongoose = require("mongoose")
const Message = require("../models/Message")
const Conversation = require("../models/Conversation")

const getConversationList = (req, res) => {

  let from = mongoose.Types.ObjectId(req.user._id)

  Conversation.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "recipients",
        foreignField: "_id",
        as: "recipientObj"
      }
    }
  ])
    .match({ recipients: { $all: [{$elemMatch: { $eq: from }}] } })
    .project({
      "recipientObj.password": 0,
      "recipientObj.__v": 0,
      "recipientObj.date": 0,
    })
    .exec((err, conversations) => {
      if(err) {
        console.log(err)
        res.status(500).json({ message: "Failure" })
      } else {
        res.status(200).json(conversations)
      }
    })
}

const getMessageFromConversation = (req, res) => {
  let user1 = mongoose.Types.ObjectId(req.user._id)
  let user2 = mongoose.Types.ObjectId(req.params.idContact)

  Message.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "to",
        foreignField: "_id",
        as: "toObj"
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "from",
        foreignField: "_id",
        as: "fromObj"
      }
    }
  ])
    .match({
      $or: [
        { $and: [{ to:user1 }, { from: user2 }]},
        { $and: [{ to:user2 }, { from: user1 }]},
      ]
    })
    .project({
      "toObj.password": 0,
      "toObj.__v": 0,
      "toObj.date": 0,
      "fromObj.password": 0,
      "fromObj.__v": 0,
      "fromObj.date": 0,
    })
    .exec((err, messages) => {
      if(err) {
        console.log(err)
        res.status(500).json({ message: "Failure !" })
      }
    })
    
}

module.exports = {
  getConversationList,
  getMessageFromConversation
}
