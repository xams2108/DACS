const socketService = require('../../services/WS/binance.service');

module.exports.subscribeToToken = (socket, symbol) => {
    socketService.subscribeToBinance(socket, symbol);
};

module.exports.unsubscribeFromToken = (socket, symbol) => {
    socketService.unsubscribeFromBinance(socket, symbol);
  }

