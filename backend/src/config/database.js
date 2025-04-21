const mongoose  = require('mongoose');

const connectDB = async () => {
  await mongoose.connect(
      "mongodb+srv://devbibek25:dPpNe4526jEy8ZGP@cluster0.mw9diwi.mongodb.net/devtinderdb"
  )
}

module.exports = connectDB;