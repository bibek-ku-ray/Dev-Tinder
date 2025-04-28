const jwt = require("jsonwebtoken");
const User = require("../models/user.js");
const {StatusCodes} = require("http-status-codes")

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies
    
    if(!token)
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Invalid token",
        error: {}
      })

    const decodedToken = await jwt.verify(
      token,
      process.env.JWT_SECRET_KEY
    );

    const {_id}  = decodedToken

    const user = await User.findById(_id)
    
    if(!user) 
      throw new Error("User not found!")

    req.user = user
    next()

  } catch (error) {
    res.status(error.statusCode || 500).send("ERROR: "+error.message)
  }
};

module.exports = {
  userAuth
}
