class MessageHandler {
  constructor (io) {
    this.io = io;

    this.users = [];
  }

  registerUser (data, socketId) {
    // add every user whether chor or police to users, save their user roles

    // normally you would write this to db
    this.users.push({
      userId: data.userId,
      userRole: data.userRole,
      socketId
    });
  }

  onChangeChorLocation (data) {
    // find all police
    const usersWhoArePolice = this.users.filter(u => u.userRole === 'police');

    usersWhoArePolice.forEach(user => {
      // send notification to all users who are police
      this.io.to(user.socketId).emit('locationChangeNotification', data);
    });
  }
}

module.exports = MessageHandler;
