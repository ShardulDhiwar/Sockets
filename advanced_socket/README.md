# ⚡ Advanced Real-Time Chat App using Socket.IO

A feature-rich real-time chat application built using **Node.js**, **Express**, and **Socket.IO** with a **React (Vite)** frontend. This version extends the basic chat app with **private messaging**, **room-based group chats**, and **real-time user notifications**.

---

## 🚀 Features

- 🔌 Real-time bidirectional communication
- 💬 Private (one-to-one) messaging
- 🏠 Room-based (group) messaging
- 👥 Real-time user join/leave notifications
- 🗺️ Username ↔ Socket ID mapping
- ♻️ Automatic connection & disconnection handling
- 🧹 Cleanup of socket listeners (no duplicates in React)

---

## 🏗️ Tech Stack

### Backend
- Node.js
- Express.js
- Socket.IO

### Frontend
- React (Vite)
- Socket.IO Client

---

## 📂 Project Structure

```
/backend
  └── server.js

/frontend
  └── src/
       └── App.jsx
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
node server.js
```

Server will run on:

```
http://localhost:3001
```

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

## 🔄 How It Works

1. Client connects to the server via Socket.IO
2. User joins with a **username** → server stores `username → socket.id` mapping
3. For **private messages**: server looks up target's `socket.id` → delivers only to them
4. For **room messages**: user joins a room → server broadcasts to all room members (except sender)
5. On **disconnect**: server removes the user from the map and notifies others

---

## 🧠 Core Concepts Covered

- Username ↔ Socket ID mapping for targeted delivery
- Private (one-to-one) messaging with `io.to(socketId).emit()`
- Room/group messaging with `socket.join(room)` and `socket.to(room).emit()`
- Broadcasting with `socket.broadcast.emit()`
- React listener cleanup with `socket.off()` to prevent duplicate events
- Connection lifecycle (connect/disconnect/user notifications)

---

## 📡 Key Events

| Event Name             | Direction         | Description                              |
|------------------------|-------------------|------------------------------------------|
| `join`                 | Client → Server   | Register username with socket            |
| `private_message`      | Client → Server   | Send a message to a specific user        |
| `receive_message`      | Server → Client   | Deliver a private message                |
| `join_room`            | Client → Server   | Join a room/group                        |
| `room_message`         | Client → Server   | Send a message to a room                 |
| `receive_room_message` | Server → Client   | Deliver a room message to members        |
| `user_joined`          | Server → Client   | Notify others when a user joins          |
| `user_left`            | Server → Client   | Notify others when a user disconnects    |

---

## 🔥 Backend — Key Logic

### Users Mapping
```js
const users = {}; // { username: socket.id }
users[username] = socket.id;
```
Enables targeted private message delivery.

### Private Messaging
```js
const targetSocketId = users[to];
io.to(targetSocketId).emit("receive_message", { from, message });
```
Only the intended recipient receives the message.

### Room Messaging
```js
socket.join(room);
socket.to(room).emit("receive_room_message", { from, message, room });
```
Everyone in the room except the sender receives the message.

### Disconnect Cleanup
```js
socket.on("disconnect", () => {
  delete users[socket.username];
  socket.broadcast.emit("user_left", socket.username);
});
```

---

## 🔥 Frontend — Key Logic

### Connect Once (outside component)
```js
const socket = io("http://localhost:3001");
```

### Cleanup Listeners (prevent React duplicates)
```js
return () => {
  socket.off("receive_message");
  socket.off("receive_room_message");
  socket.off("user_joined");
  socket.off("user_left");
};
```

### State Management
| State         | Purpose                                  |
|---------------|------------------------------------------|
| `chat`        | Private messages + join/leave alerts     |
| `roomMessage` | Room/group messages                      |

---

## ✅ What This System Supports

- Multiple concurrent users
- Private one-to-one messaging
- Room-based group messaging
- Real-time join/leave notifications

---

## ⚠️ Limitations (Current Version)

- No authentication
- No message persistence
- No offline message queuing
- No multiple room management UI

---

## 🚀 Future Improvements

- 🔐 JWT-based user authentication
- 💾 Persist messages in a database (MongoDB/PostgreSQL)
- 📴 Handle offline users and message queuing
- 📱 Improved UI/UX
- 📊 Typing indicators & online status

---

## 🎯 Learning Outcome

This project helps you understand:

- How private and group messaging works under the hood
- The role of socket ID mapping in real-time systems
- Difference between `io.emit`, `socket.broadcast.emit`, and `io.to().emit`
- Why React needs `socket.off()` cleanup in `useEffect`
- How rooms abstract group communication in Socket.IO

---

## 🤝 Contributing

Feel free to fork the repo and enhance the project!

---

## 📜 License

This project is open-source and available under the **MIT License**.

---

## 👨‍💻 Author

**Shardul Dhiwar**

> 💡 *"HTTP asks. WebSockets listen. Rooms organize."*