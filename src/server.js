const express = require('express');
const http = require('http');
const path = require('path');
const startSocketServer = require('./socket-server');

const port = 3000;

const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const server = http.createServer(app).listen(port, () => {
  console.log(`http server listening on port ${3000}`);
});

startSocketServer(server);
