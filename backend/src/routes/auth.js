const express = require('express');
const {validateSignupData, validateLoginData} = require("../utils/validateUserData.js");
const bcrypt = require("bcryptjs");
const User = require("../models/user.js");
const {userAuth} = require("../middlewares/auth.js");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    validateSignupData(req);

    const {password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({...req.body, password: hashedPassword});

    await user.validate();
    await user.save();

    res.send("Signup successfully");
  } catch (e) {
    res.status(e.statusCode || 400).send("ERROR: " + e.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    validateLoginData(req);
    const {username, email, password} = req.body;
    const user = await User.findOne({$or: [{username}, {email}]});

    if (!user) throw new Error("Invalid credentials");

    const isPasswordValid = await user.verifyPassword(password)

    if (!isPasswordValid) throw new Error("Invalid credentials");

    // creating jwt token with userid
    const jwtToken = await user.generateAuthToken()

    res
        .cookie("token", jwtToken, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        })
        .status(200)
        .json({
          success: true,
          message: "LoggedIn successfully",
          data: user,
          error: ""
        });
  } catch (e) {
    res
      .status(e.statusCode || 400)
      .json({
        success: false,
        message: "LoggedIn Failed",
        data: "",
        error: e.message,
      });
  }
});

// logout
authRouter.post("/logout", async (req, res) => {
  res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now())
      })
      .send("Logout successfully")
})


// update profile
authRouter.put("/update/:id", userAuth, async (req, res) => {
  try {
    const {id} = req.params;
    const userData = req.body;

    // validating which field can be updated
    const updateAllowed = [
      "username",
      "firstName",
      "lastName",
      "password",
      "age",
      "bio",
      "skills",
      "profilePicture",
    ];

    const isEditAllowed = Object.keys(userData).every((key) =>
        updateAllowed.includes(key)
    );

    if (!isEditAllowed) {
      return res.status(400).send("These field can not be updated!");
    }

    if (!checkSkillLength(userData.skills)) {
      return res.status(400).json({
        success: false,
        message: "Cant add more then 10 skills",
      });
    }

    const user = await User.findOneAndUpdate({_id: id}, userData, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!user) {
      return res.status(404).send("user not found");
    }

    return res.status(200).json({data: user});
  } catch (e) {
    res.send("Fail to update: " + e.message);
  }
});

// check no. of skill, max is up to 10
const checkSkillLength = (data) => {
  return data.length < 10;
};

module.exports = authRouter;