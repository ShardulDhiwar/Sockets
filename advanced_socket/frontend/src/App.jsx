import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [privateTo, setPrivateTo] = useState("");
  const [room, setRoom] = useState("");
  const [roomMessage, setRoomMessage] = useState([]);

  useEffect(() => {
    // 1. Listen for private messages
    socket.on("receive_message", (data) => {
      setChat((prev) => [...prev, `${data.from}: ${data.message}`]);
    });

    // 2. Listen for room messages
    socket.on("receive_room_message", (data) => {
      setRoomMessage((prev) => [...prev, `${data.from}: ${data.message}`]);
    });

    // 3. Listen for user join/leave
    socket.on("user_joined", (name) => {
      setChat((prev) => [...prev, `${name} joined`]);
    });

    socket.on("user_left", (name) => {
      setChat((prev) => [...prev, `${name} left`]);
    });

    return () => {
      socket.off("receive_message");
      socket.off("receive_room_message");
      socket.off("user_joined");
      socket.off("user_left");
    };
  }, []);

  // 4. Join with username
  const handleJoin = () => {
    socket.emit("join", username);
  };

  // 5. Send private message
  const sendPrivate = () => {
    socket.emit("private_message", { to: privateTo, message });
    setChat((prev) => [...prev, `Me → ${privateTo}: ${message}`]);
    setMessage("");
  };

  // 6. Join room
  const handleJoinRoom = () => {
    socket.emit("join_room", room);
  };

  // 7. Send room message
  const sendRoomMessage = () => {
    socket.emit("room_message", { room, message });
    setRoomMessage((prev) => [...prev, `Me: ${message}`]);
    setMessage("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Advanced Socket.IO Chat</h1>

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleJoin}>Join</button>

      <hr />

      <input
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <input
        placeholder="To (for private)"
        value={privateTo}
        onChange={(e) => setPrivateTo(e.target.value)}
      />
      <button onClick={sendPrivate}>Send Private</button>

      <hr />

      <input
        placeholder="Room"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={handleJoinRoom}>Join Room</button>
      <button onClick={sendRoomMessage}>Send Room Message</button>

      <hr />

      <h2>Private Chat</h2>
      <div>{chat.map((c, i) => <div key={i}>{c}</div>)}</div>

      <h2>Room Chat</h2>
      <div>{roomMessage.map((c, i) => <div key={i}>{c}</div>)}</div>
    </div>
  );
}

export default App;