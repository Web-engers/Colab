import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import axios from "axios"
import cors from "cors"
const app = express();
const port = 3001;
const server = http.createServer(app);
app.use(cors())
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

app.get("/api/images", async (req, res) => {
  try {
    const cloudName = "dgy49rzwv";
    const apiKey = "348792394536415";  // Replace with your Cloudinary API key
    const apiSecret = "ESm58XEUxv9oFwr80-dlmgr8ixQ";  // Replace with your Cloudinary API secret

    // Make the request to Cloudinary API
    const response = await axios.get(`https://api.cloudinary.com/v1_1/${cloudName}/resources/image`, {
      headers: {
        Authorization: `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')}`,
      },
    });

    // Send the data back to the frontend
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ error: "Failed to fetch images" });
  }
});
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});