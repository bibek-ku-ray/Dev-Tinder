const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database.js");
const cors = require("cors");
const { createServer } = require("http");
const initializeSocket = require("./utils/socket.js");

const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://18.208.184.226"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Alive");
});

// routes
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const requestRoutes = require("./routes/request");
const userRoutes = require("./routes/user");

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/request", requestRoutes);
app.use("/api/user", userRoutes);

// socket configuration
const httpServer = createServer(app);
initializeSocket(httpServer);

// Connecting to a database.
connectDB()
  .then(() => {
    console.log("Connected to DB");
    httpServer.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(`Fail to connect to db. Error: ${err.message}`);
  });
