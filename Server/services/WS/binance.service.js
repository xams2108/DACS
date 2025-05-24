const WebSocket = require("ws");
const clients = {}; // { BTCUSDT: Set([socket1, socket2, ...]), ... }
const streams = {}; // { BTCUSDT: WebSocket }

function createBinanceStream(symbol, streams) {
  const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@${streams}`);

  ws.on("message", (data) => {
    const parsed = JSON.parse(data);
    const Data = {
      symbol: symbol.toUpperCase(),
      type: streams,
      data: parsed
    };

    const sockets = clients[symbol];
    if (sockets) {
      for (const socket of sockets) {
        socket.emit(`price:update:${symbol}@${streams}`, Data);
      }
    }
  });

  ws.on("close", () => {
    delete streams[symbol];
    console.log(`🔌 Binance stream closed: ${symbol}`);
  });

  streams[symbol] = ws;
}

module.exports = {
  subscribeToBinance: (socket, symbol, streams) => {
        try {
      if (!clients[symbol]) clients[symbol] = new Set();
      clients[symbol].add(socket);

      if (!streams[symbol]) {
        createBinanceStream(symbol, streams);
      }
    } catch (error) {
      console.error(`Error while handling WebSocket subscription for ${symbol}:`, error);
    }
  },

  unsubscribeFromBinance: (socket, symbol, streams) => {
    if (clients[symbol]) {
      clients[symbol].delete(socket);
      if (clients[symbol].size === 0) {
        streams[symbol]?.close();
        delete clients[symbol];
      }
    }
  }
};
