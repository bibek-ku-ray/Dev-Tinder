const validator = require("validator");

const validateSignupData = (req) => {

  const {firstName, lastName, username, email, password} = req.body

  if(!firstName || !lastName) {
    throw new Error("Missing Name")
  } else if (username.length < 4 || username.length > 16 ) {
    throw new Error("Username must be of 4 to 16 character")
  } else if(!validator.isEmail(email)) {
    throw new Error("Invalid email address")
  } else if(!validator.isStrongPassword(password)) {
    throw new Error("Use strong password")
  }
}

const validateLoginData = (req) => {
  const {username, email, password} = req.body
  if (!username && !email) {
    throw new Error("Username or email field is Missing");
  } else if(!password) {
    throw new Error("Password field is Missing");
  }
}

const validateEditProfileData = (req) => {
  const editAllowedFields = [
    "username",
    "firstName",
    "lastName",
    "password",
    "age",
    "bio",
    "skills",
    "profilePicture",
  ];

  return Object.key(req.body).every((k) => editAllowedFields.includes(k))
}

module.exports = {
  validateSignupData, 
  validateLoginData,
  validateEditProfileData
}