const express = require("express")
const {userAuth} = require("../middlewares/auth");
const {StatusCodes} = require("http-status-codes");
const ConnectionRequest = require("../models/connectionRequest")

const userRouter = express.Router()

const USER_PUBLIC_DATA = [
  "username",
  "firstName",
  "lastName",
  "profilePicture",
  "skills",
  "bio",
  "gender",
  "age"
]

/*
OR -> can be an array or string too,
const USER_PUBLIC_DATA = "username firstName lastName profilePicture skills bio gender age"
 */

userRouter.get("/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested"
    }).populate("fromUserId", USER_PUBLIC_DATA)

    return res.status(StatusCodes.OK).json({
      success: true,
      data: connectRequests
    })
  } catch (e) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Something went wrong!",
    })
  }
})


userRouter.get("/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user

    const connections = await ConnectionRequest.find({
      $or: [
        {toUserId: loggedInUser._id},
        {fromUserId: loggedInUser._id}
      ],
      status: "accepted"
    }).populate("fromUserId", USER_PUBLIC_DATA)
        .populate("toUserId", USER_PUBLIC_DATA)

    const data = connections.map((row) => {
      if (row.fromUserId._id.equals(loggedInUser._id)) {
        return row.toUserId
      }
      return row.fromUserId
    })

    return res.status(StatusCodes.OK).json({
      success: true,
      data: data
    })

  } catch (e) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Something went wrong!",
    })
  }
})

module.exports = userRouter