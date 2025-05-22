const binanceSocket = require('./binance.socket');
module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`📡 New socket connected: ${socket.id}`);
    binanceSocket(socket);



    
    socket.on('disconnect', () => {
      console.log(`❌ Disconnected: ${socket.id}`);
    });
  });
};
