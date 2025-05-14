const express  = require("express")
const Chat = require("../models/chat")
const { userAuth } = require("../middlewares/auth");

const chatRouter = express.Router()

chatRouter.get("/:targetUserId", userAuth, async (req, res) => {

  const { targetUserId } = req.params

  const userId = req.user._id

  try {
    let chat = await Chat.findOne({
      participants: { $all: [userId, targetUserId] },
    }).populate({
      path: "messages.senderId",
      select: "firstName lastName profilePicture",
    })

    if (!chat) {
      chat = new Chat({
        participants: [userId, targetUserId],
        messages: [],
      })
      await chat.save()
    }
    return res.status(200).json({
      success: true,
      chat: chat,
    })
  } catch (error) {
    console.error("Error in chat route:", error)
    res.status(500).send("Internal Server Error")
  }
})

module.exports = chatRouter

