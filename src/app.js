const path = require('path');
// eslint-disable-next-line import/newline-after-import
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/public/index.html`));
});

io.on('connection', (socket) => {
  console.log(`User has joined with socket ${socket.id}`);

  socket.on('chat', (chat) => {
    io.emit('chat', chat);
  });

  socket.on('disconnect', () => {
    console.log('User has disconnected.');
  });
});

http.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}.`);
});