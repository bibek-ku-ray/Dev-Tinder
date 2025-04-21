const express = require('express');
const {userAuth} = require("../middlewares/auth");
const requestRouter = express.Router();

// send connection request
requestRouter.post("/send-connection-request", userAuth, async (req, res) => {
  const {username} = req.user
  res.send(username + " sent connection request")
})

module.exports = requestRouter;