const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database.js");

const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Alive");
});

// routes
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const requestRoutes = require("./routes/request");

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/request", requestRoutes);

// Connecting to a database.
connectDB()
    .then(() => {
      console.log("Connected to DB");
      app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
      });
    })
    .catch((err) => {
      console.error(`Fail to connect to db. Error: ${err.message}`);
    });
