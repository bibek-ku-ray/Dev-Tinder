const socket = require("socket.io");
const bcrypt = require("bcryptjs");
const Chat = require("../models/chat");

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

    socket.on(
      "sendMessage",
      async ({ firstName, userId, targetUserId, text }) => {
        const roomId = [userId, targetUserId].sort().join("-");

        // save messages to the database
        try {
          let chat = await Chat.findOne({
            participants: { $all: [userId, targetUserId] },
          });

          if (!chat) {
            chat = new Chat({
              participants: [userId, targetUserId],
              messages: [],
            });
          }

          chat.messages.push({
            senderId: userId,
            text,
          });
          await chat.save();

        } catch (error) {
          console.error("Error saving message:", error);
          socket.emit("error", "Failed to save message");
          return;
        }

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
      }
    );

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  return io;
}

module.exports = initializeSocket;
