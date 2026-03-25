import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);

// 1. Create socket.io server
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", // frontend
    methods: ["GET", "POST"],
  },
});

// 2. Store connected users
const users = {}; // { username: socket.id }

io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  // 3. User joins with a username
  socket.on("join", (username) => {
    users[username] = socket.id; // map username to socket.id
    socket.username = username; // optional, store on socket
    console.log("Users online:", users);

    // 4. Broadcast new user joined
    socket.broadcast.emit("user_joined", username);
  });

  // 5. Sending a private message
  socket.on("private_message", ({ to, message }) => {
    const targetSocketId = users[to];
    if (targetSocketId) {
      io.to(targetSocketId).emit("receive_message", {
        from: socket.username,
        message,
      });
    }
  });

  // 6. Sending a room/group message
  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`${socket.username} joined room ${room}`);
  });

  socket.on("room_message", ({ room, message }) => {
    // Broadcast to everyone in the room except sender
    socket.to(room).emit("receive_room_message", {
      from: socket.username,
      message,
      room,
    });
  });

  // 7. Handle disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.username);
    if (socket.username) delete users[socket.username];
    socket.broadcast.emit("user_left", socket.username);
  });
});

httpServer.listen(3001, () => {
  console.log("Socket server running on port 3001");
});