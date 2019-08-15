module.exports = function(server) {
  const io = require('socket.io')(server);

  io.on('connection', function(socket) {
      console.log('a user connected');

      socket.on('message', function(msg, cb) {
          socket.broadcast.emit('message', msg);
          cb();
      });
  });
}