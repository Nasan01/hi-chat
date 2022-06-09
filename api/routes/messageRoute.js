const express = require('express');
const router = express.Router()

const messageController = require("../controllers/messageController")
const authMiddleware = require("../middlewares/authMiddleware")

router.use(authMiddleware.verify)

router.get("/conversations", messageController.getConversationList)
router.get("/conversation/message", messageController.getMessageFromConversation)
router.post("/private", messageController.postPrivateMessage)

module.exports = router
