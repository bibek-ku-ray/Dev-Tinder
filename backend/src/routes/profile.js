const express = require('express');
const {userAuth} = require("../middlewares/auth");
const {validateEditProfileData} = require("../utils/validateUserData");
const bcrypt = require("bcryptjs")
const validator = require("validator/es");

const profileRouter = express.Router();

// to view the profile
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({success: true, data: user});
  } catch (error) {
    res.status(error.statusCode || 500).send("ERROR: " + error.message);
  }
});

// to edit the profile
profileRouter.post("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit request")
    }
    const loggedUser = req.user
    Object.keys(req.body).forEach((key) => (loggedUser[key] = req.body[key]))
    await loggedUser.save()

    res.status(200).json({
      success: true,
      data: loggedUser
    })

  } catch (e) {
    res.status(e.statusCode || 500).send("ERROR: " + e.message);
  }
})

// change password
profileRouter.post("/profile/password", async (req, res) => {
  try {
    const user = req.user;
    const {newPassword, oldPassword} = req.body

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password)

    if(!isPasswordValid)
      throw new Error("Invalid old password")

    if(!validator.isStrongPassword(newPassword))
      throw new Error("Use strong password")

    const hashedNewPassword = await bcrypt.hash(newPassword, 10)

    await User.findByIdAndUpdate(user._id, {
      password: hashedNewPassword
    })

    res.status(200).json({
      message: "password changed"
    })


  } catch (e) {

  }
})

module.exports = profileRouter;