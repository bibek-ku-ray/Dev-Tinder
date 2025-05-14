const socket = require("socket.io");
const bcrypt = require("bcryptjs");

function initializeSocket(httpServer) {
  const io = socket(httpServer, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    // Store socket ID to user ID mapping
    let socketUserId = null;

    socket.on("joinChat", async ({ firstName, userId, targetUserId }) => {
      console.log(firstName, userId, targetUserId);

      // Store the user's ID for this socket connection
      socketUserId = userId;

      const roomId = [userId, targetUserId].sort().join("-");

      console.log("Joining Hashed RoomId: ", roomId);
      socket.join(roomId);
    });

    socket.on("sendMessage", ({ firstName, userId, targetUserId, text }) => {
      const roomId = [userId, targetUserId].sort().join("-");

      // Send to sender (with targetUserMessage: false)
      socket.emit("messageReceived", {
        firstName,
        userId,
        targetUserId,
        text,
        targetUserMessage: false,
      });

      socket.to(roomId).emit("messageReceived", {
        firstName,
        userId,
        targetUserId,
        text,
        targetUserMessage: true,
      });

      console.log(firstName + " sent: " + text);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  return io;
}

module.exports = initializeSocket;
