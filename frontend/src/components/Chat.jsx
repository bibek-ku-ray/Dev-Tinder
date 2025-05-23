import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import axios from "axios";

const Chat = () => {
  // Time code remains the same
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  const { targetUserId } = useParams();
  const user = useSelector((state) => state.user);
  const targetUser = useSelector((state) =>
    state.connection?.find((user) => user._id === targetUserId)
  );

  const userId = user?.data._id;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  // Add socket reference
  const socketRef = useRef(null);
  const chatContainerRef = useRef(null);

  // fetching chat data
  const fetchChatMessage = async () => {
    try {
      const chat = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
        withCredentials: true,
      });

      // Check if we need to access the _id property of senderId
      const fetchChatMessages = chat.data.chat.messages.map((msg) => {
        // Determine the correct senderId based on its structure
        const actualSenderId =
          typeof msg.senderId === "object" && msg.senderId !== null
            ? msg.senderId._id
            : msg.senderId;

        return {
          message: msg.text,
          senderId: actualSenderId,
          targetUserId: msg.targetUserId,
          targetUserMessage: String(actualSenderId) !== String(userId),
        };
      });

      setMessages(fetchChatMessages);
    } catch (error) {
      console.error("Error fetching chat messages:", error);
    }
  };

  useEffect(() => {
    fetchChatMessage();
  }, []);

  // Scroll to bottom effect
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!userId) return;

    // Create and store socket connection
    const socket = createSocketConnection();
    socketRef.current = socket;

    // Join chat room
    socket.emit("joinChat", {
      firstName: user?.data?.firstName,
      userId,
      targetUserId,
    });

    // Listen for incoming messages
    socket.on(
      "messageReceived",
      ({ firstName, userId, text, targetUserMessage }) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { message: text, targetUserMessage },
        ]);
      }
    );

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    if (!socketRef.current || !newMessage?.trim()) return;

    // Send message using the EXISTING socket
    socketRef.current.emit("sendMessage", {
      firstName: user?.data?.firstName,
      userId,
      targetUserId,
      text: newMessage,
    });

    // Clear input
    setNewMessage("");
  };

  return (
    <div className="w-full h-[90%] px-[20%] py-[1%]">
      {/* Header remains the same */}
      <div className="h-1/12 flex items-center gap-1.5 px-5 bg-base-300 border-b-2 border-secondary">
        <div className="avatar h-[80%]">
          <div className="mask mask-circle h-full">
            <img src={targetUser?.profilePicture} alt={targetUser?.firstName} />
          </div>
        </div>
        <div>
          <p className="text-2xl font-bold">
            {targetUser?.firstName + " " + targetUser?.lastName}{" "}
          </p>
        </div>
      </div>

      {/* Make messages container scrollable */}
      <div
        ref={chatContainerRef}
        className="h-[70vh] overflow-y-auto px-5 bg-base-300"
      >
        {messages &&
          messages?.map((msg, index) => (
            <div key={index} className="my-2">
              <div
                className={`chat ${
                  msg.targetUserMessage ? "chat-start" : "chat-end"
                }`}
              >
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Chat avatar"
                      src={
                        msg.targetUserMessage
                          ? targetUser?.profilePicture
                          : user?.data?.profilePicture
                      }
                    />
                  </div>
                </div>
                <div className="chat-header">
                  {msg.targetUserMessage
                    ? targetUser?.username
                    : user?.data?.username}
                  <time className="text-xs opacity-50">
                    {hours}:{minutes}
                  </time>
                </div>
                <div className="chat-bubble">{msg.message}</div>
              </div>
            </div>
          ))}
      </div>

      {/* Input area remains mostly the same */}
      <div className="h-1/12 w-full mt-4">
        <input
          value={newMessage}
          type="text"
          placeholder="Type here"
          className="input w-[85%] h-full border-secondary"
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />

        <button
          className="btn btn-secondary w-[15%] h-full"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
