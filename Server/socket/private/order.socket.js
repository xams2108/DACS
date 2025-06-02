const socketController = require('../../controller/WS/orderSocket.controller');

module.exports = (socket) => {
  const user = socket.user
  // socket.on('order-notify', (socket) => {
  //   socketController.notifyOrder(socket);
  // });
};
