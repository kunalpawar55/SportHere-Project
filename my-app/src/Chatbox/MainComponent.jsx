import React, { useState } from "react";
import axios from "axios";

export default function MainComponent({ prop, setprop }) {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const userData = JSON.parse(localStorage.getItem("user"));
  const username = userData?.name || "";

  let secondChar = "";
  for (let i = 0; i < username.length; i++) {
    if (username[i] === " " && username[i + 1]) {
      secondChar = username[i + 1].toUpperCase();
      break;
    }
  }

  const finalUsername = username
    ? username.charAt(0).toUpperCase() + secondChar
    : "U";

  const sendMessage = async () => {
    if (!message.trim()) return;

    setChat((prev) => [...prev, { sender: "user", text: message }]);

    try {
      const res = await axios.post("http://localhost:8080/api/chat", {
        message,
      });

      setChat((prev) => [...prev, { sender: "bot", text: res.data.reply }]);
    } catch (err) {
      console.error(err);
      setChat((prev) => [
        ...prev,
        { sender: "bot", text: "Error connecting to server." },
      ]);
    }

    setMessage("");
  };

  return (
    <div className="flex flex-col h-full w-full">

      <div className="bg-gradient-to-r from-[#0e3657] to-[#1e5a89] text-white px-4 py-3 flex justify-between items-center rounded-t-xl">
        <h1 className="text-lg font-semibold">Chatbot</h1>
        <button onClick={() => setprop(!prop)} className="text-white text-xl">
          ✖
        </button>
      </div>

      <div className="flex-1 p-3 bg-gray-100 overflow-y-auto flex flex-col gap-3">
        {chat.length === 0 && (
          <p className="text-center text-gray-500 italic mt-5">
            👋 Hello! How can I assist you today?
          </p>
        )}

        {chat.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start gap-2 ${
              msg.sender === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold
                ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-400 text-black"
                }`}
            >
              {msg.sender === "user" ? finalUsername : "B"}
            </div>

            <div
              className={`p-2 rounded-xl max-w-[70%] text-sm ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-3 bg-gray-200 border-t border-gray-300 flex items-center gap-2">
        <input
          className="flex-1 p-2 rounded-full bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button
          onClick={sendMessage}
          className="bg-blue-700 text-white p-3 rounded-full hover:bg-blue-800 transition"
        >
          ➤
        </button>
      </div>
    </div>
  );
}
