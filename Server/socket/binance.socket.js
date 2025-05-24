const socketController = require('../controller/WS/priceSocket.controller');

module.exports = (socket) => {
  socket.on('subscribe:token', ({ symbol, streams }) => {
    socketController.subscribeToToken(socket, symbol, streams);
  });

  socket.on('unsubscribe:token', ({ symbol, streams }) => {
    socketController.unsubscribeFromToken(socket, symbol, streams);
  });
};
