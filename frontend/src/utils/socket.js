import io from "socket.io-client";

const BASE_URL = import.meta.env.VITE_SOCKET_URL;

export const createSocketConnection = () => {
  console.log("Connecting to socket server at:", BASE_URL);
  const socket = io(BASE_URL);

  // Add connection handling
  socket.on("connect", () => {
    console.log("Socket connected successfully!");
  });

  socket.on("connect_error", (error) => {
    console.error("Socket connection error:", error);
  });

  return socket;
};
