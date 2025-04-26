const express = require("express")
const {userAuth} = require("../middlewares/auth.js");
const {StatusCodes} = require("http-status-codes");
const ConnectionRequest = require("../models/connectionRequest")
const User = require("../models/user.js")

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


// feed
userRouter.get("/feed", userAuth, async (req, res) => {

  // all the users in feeds except loggedInUser
  // exclude already connected


  try {
  // Approach: 1
    /*
    const loggedInUser = req.user
    const connections = await ConnectionRequest.find({
      $or: [
        {toUserId: loggedInUser._id},
        {fromUserId: loggedInUser._id}
      ]
    })

    const loggedInUserConnectionsIds = connections?.map((item) => {
      return item.fromUserId.equals(loggedInUser._id) ? item.toUserId : item.fromUserId
    })
    console.log(loggedInUserConnectionsIds)

    const feeds = await User.find({
      _id: {
        $nin: [loggedInUser._id, ...loggedInUserConnectionsIds]
      }
    }).select(USER_PUBLIC_DATA);

    return res.status(StatusCodes.OK).json({
      success: true,
      data: feeds
    })
    */

    // Approach: 2 with pagination
    const loggedInUser  = req.user
    const page = parseInt(req.query.page) || 1
    let limit = parseInt(req.query.limit) || 10

    //  the maximum limit can be 25
    limit = limit > 25 ? 25 : limit

    const skip = (page-1) * limit

    const connectionRequests = await ConnectionRequest.find({
      $or: [{fromUserId: loggedInUser._id}, {toUserId: loggedInUser._id}]
    }).select("toUserId fromUserId")

    const hideUserFromFeed = new Set()

    connectionRequests.forEach((request) => {
          hideUserFromFeed.add(request.fromUserId);
          hideUserFromFeed.add(request.toUserId);
        }
    )

    const users = await User.find({
      $and:[
        {_id: {$ne: loggedInUser._id}},
        {_id: {$nin: Array.from(hideUserFromFeed)}}
      ]
    })
    .select(USER_PUBLIC_DATA)
    .skip(skip) // pagination
    .limit(limit);

    return res.status(StatusCodes.OK).json({
      success: true,
      data: users
    })

  } catch (e) {
    console.log(e)

    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Something went wrong!",
      error: e.message
    })
  }
})

module.exports = userRouter