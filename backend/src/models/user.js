const mongoose  = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  username:{
    type: String,
    required: true,
    unique: true,
    minLength: [4, "Must be at least 4 characters long."],
    maxLength: [16, "Must be maximum of 16 characters."],
    trim: true,
    lowercase: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if(!validator.isEmail(value)) throw new Error("Email is invalid");
    }
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Must be at least 8 characters."],
    trim: true,
    validate(value) {
      if(!validator.isStrongPassword(value)) throw new Error("User strong Password");
    }
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
    validate: {
      validator: value => Promise.resolve(["male", "female", "other"].includes(value)),
      message: 'Invalid gender.'
    },
  },
  bio: {
    type: String,
    default: 'Bio is empty, pleas add it.',
  },
  skills: {
    type: [String],
  },
  profilePicture: {
    type: String,
    default: "https://cdn.pixabay.com/photo/2018/11/13/22/01/avatar-3814081_1280.png",
    validate(value) {
      if (!validator.isURL(value)) throw new Error("Profile picture url is invalid");
    }
  }
}, { timestamps: true });

userSchema.methods.verifyPassword = async function(inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
}

userSchema.methods.generateAuthToken = async function() {
  return await jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, {expiresIn: '7d'});
}

const User = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = User;
