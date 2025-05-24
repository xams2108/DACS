const socketService = require('../../services/WS/binance.service');

module.exports.subscribeToToken = (socket, symbol, streams) => {
    socketService.subscribeToBinance(socket, symbol, streams);
};

module.exports.unsubscribeFromToken = (socket, symbol, streams) => {
    socketService.unsubscribeFromBinance(socket, symbol, streams);
};

