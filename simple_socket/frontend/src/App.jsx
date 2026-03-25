import { useState, useEffect } from "react";
import { io } from "socket.io-client";

// Connect to backend
const socket = io("http://localhost:3001");

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Send message
  const sendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("send_message", message);
      setMessage("");
    }
  };

  // Listen for messages
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    // Cleanup (VERY IMPORTANT)
    return () => {
      socket.off("receive_message");
    };
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Real-time Chat</h2>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter message"
      />

      <button onClick={sendMessage}>Send</button>

      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
    </div>
  );
}

export default App;