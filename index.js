const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"]
    }
});
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    // Rejoindre une salle de chat
    socket.on('joinChat', (chatId) => {
        socket.join(chatId);
        console.log(`${socket.id} joined chat ${chatId}`);
    });
    // Envoyer un message dans une salle spécifique
    socket.on('sendMessage', (data) => {
        io.to(data.chatId).emit('receiveMessage', data);
    });
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});
server.listen(3055, () => console.log('Server running on http://localhost:3000'));