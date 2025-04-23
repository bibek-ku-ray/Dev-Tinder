const express = require('express');
const {userAuth} = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest.js")
const {StatusCodes} = require("http-status-codes")
const User = require("../models/user.js")

const requestRouter = express.Router();

// send connection request
requestRouter.post("/send/:status/:toUserId", userAuth, async (req, res) => {
  try{
    const fromUserId = req.user._id
    const toUserId = req.params.toUserId
    const status = req.params.status

    const allowedStatus = ["ignored", "interested"]

    if(!allowedStatus.includes(status)) {
      return res.status(403).json({
        success: false,
        message: "invalid status"
      })
    }

    // check does toUserId exits
    const toUser = await User.findById(toUserId)
    if(!toUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }


    // check connection request already exist or not
    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or:[
          {fromUserId, toUserId},
          {fromUserId: toUserId, toUserId: fromUserId}
      ]
    })

    if(existingConnectionRequest) {
      return res.status(409).json({
        success: false,
        message: "Connection already exists"
      })
    }

    // create connection request
    const connectionRequest = new ConnectionRequest({
      fromUserId, toUserId, status
    })
    await connectionRequest.save()

    return res.status(201).json({
      success: true,
      message: `${req.user.username} has ${status} connection request of ${toUser.username}`
    })

  } catch (e) {
    res.status(400).send("ERROR: " + e.message);
  }
})


requestRouter.post("/review/:status/:requestId", userAuth, async (req, res) => {
  try{
    const {status, requestId} = req.params
    const loggedInUser = req.user

    // status should be accepted or rejected only
    const allowedStatus = ["accepted", "rejected"]

    if(!allowedStatus.includes(status)) {
      return res
          .status(StatusCodes.BAD_REQUEST)
          .json({
            success: false,
            message: "Invalid status"
          })
    }

    // check connect is of loggedIn user - with status:interested
    const connectRequest = await ConnectionRequest.findOne({
      _id: requestId,
      toUserId: loggedInUser._id,
      status: "interested"
    })

    if(!connectRequest) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Connection request not found"
      })
    }

    // change the status
    connectRequest.status = status
    await connectRequest.save()

    return res.status(StatusCodes.ACCEPTED).json({
      success: true,
      message: `You ${status} connection request`
    })
  } catch (e) {
    res.status(e.statusCode || 500).send("ERROR: "+e.message)
  }
})

module.exports = requestRouter;