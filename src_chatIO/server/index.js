const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

// const io = new Server(server);
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.js');
// });

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('sendMessage', (msg) => {
        io.emit('getResponse', 'receiverd: ' + msg);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
