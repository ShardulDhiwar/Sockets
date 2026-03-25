const express = require("express"); 
const http = require("http"); 
const { Server } = require("socket.io"); 
const cors = require("cors"); 

// Create express app
const app = express();

// Use CORS (important for frontend connection)
app.use(cors());

// Create HTTP server (IMPORTANT)
const server = http.createServer(app);

// Attach socket.io to server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // frontend URL
    methods: ["GET", "POST"],
  },
});

// Listen for connections
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Listen for message from client
  socket.on("send_message", (data) => {
    console.log("Message received:", data);

    // Send message to ALL clients
    io.emit("receive_message", data);
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start server
server.listen(3001, () => {
  console.log("Server running on port 3001");
});