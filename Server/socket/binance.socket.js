const socketController = require('../controller/WS/priceSocket.controller');

module.exports = (socket) => {
  socket.on('subscribe:token', (symbol) => {
    socketController.subscribeToToken(socket, symbol);
  });

  socket.on('unsubscribe:token', (symbol) => {
    socketController.unsubscribeFromToken(socket, symbol);
  });
};
