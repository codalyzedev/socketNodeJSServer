const socketIo = require('socket.io');
const MessageHandler = require('./MessageHandler');

const startSocketServer = (server) => {
  const io = socketIo.listen(server, {cookie: false});

  const messageHandler = new MessageHandler(io);

  io.on('connection', function (socket) {
    // each user when connected, has a unique socket.id. We will map this socket.id to his user id in registerUser event
    // when chor changes location, we will send notification to all users who are police
    console.log(`User with socket id = ${socket.id} connected`);

    socket.on('registerUser', data => {
      // normally you won't read this by an event because anyone can send this event. you need to identify user from cookie data
      // and then look up his userRole from db. You would need to save his current socket.id to db / OR you can see room implementation of socket
      // and join user to a room which has same id as userId.
      console.log(`${data.userId} connected. USER ROLE= ${data.userRole}. Unique socket id for this connection = ${socket.id}`);
      messageHandler.registerUser(data, socket.id);
    });

    socket.on('chorLocationChanged', data => {
      console.log(`Chor has changed location. Now notify police`);
      messageHandler.onChangeChorLocation(data);
    });
  });
};

module.exports = startSocketServer;
