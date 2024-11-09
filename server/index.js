import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const port = 3001;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Adjust based on your React app's URL
    methods: ["GET", "POST"],
  },
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('chatMessage', (msg) => {
    console.log('Received message:', msg);
    io.emit('chatMessage', msg); // Emit to all clients
    console.log(msg)
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});