# ⚡ Real-Time Chat App using Socket.IO

A simple yet powerful real-time chat application built using **Node.js**, **Express**, and **Socket.IO** with a **React (Vite)** frontend. This project demonstrates how persistent connections work and how real-time communication is achieved using WebSockets.

---

## 🚀 Features

- 🔌 Real-time bidirectional communication
- ⚡ Instant message broadcasting
- 🌐 WebSocket-based connection (with fallback support)
- 🧠 Clean and simple event-driven architecture
- ♻️ Automatic connection handling (connect/disconnect)

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

1. Client establishes a connection with the server using Socket.IO
2. When a user sends a message:
   - Frontend emits `send_message` event
3. Backend listens for the event and broadcasts it:
   - `io.emit("receive_message", data)`
4. All connected clients receive the message instantly

---

## 🧠 Core Concepts Covered

- Sockets & Persistent Connections
- WebSocket Protocol (HTTP Upgrade)
- Event-driven communication
- Client ↔ Server real-time messaging
- Connection lifecycle (connect/disconnect)

---

## 📡 Key Events

| Event Name        | Description                        |
|-------------------|------------------------------------|
| `send_message`    | Sent from client to server         |
| `receive_message` | Broadcasted to all clients         |

---

## ⚠️ Limitations (Basic Version)

- No authentication
- No user identification
- No chat rooms
- No message persistence

---

## 🚀 Future Improvements

- 🔐 Add JWT authentication
- 🧑‍🤝‍🧑 Implement chat rooms
- 💾 Store messages in database
- 📱 Improve UI/UX
- 📊 Add typing indicators & online status

---

## 🎯 Learning Outcome

This project helps you understand:

- How real-time apps like chat systems work
- Difference between HTTP and WebSockets
- Why Socket.IO is used over raw WebSocket
- How frontend and backend communicate continuously

---

## 🤝 Contributing

Feel free to fork the repo and enhance the project!

---

## 📜 License

This project is open-source and available under the **MIT License**.

---

## 👨‍💻 Author

**Shardul Dhiwar**

> 💡 *"HTTP asks. WebSockets listen."*
