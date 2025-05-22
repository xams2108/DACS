const WebSocket = require("ws");
const clients = {}; // { BTCUSDT: Set([socket1, socket2, ...]), ... }
const streams = {}; // { BTCUSDT: WebSocket }

function createBinanceStream(symbol) {
  const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@trade`);

  ws.on("message", (data) => {
    const parsed = JSON.parse(data);
    const priceData = {
      symbol: symbol.toUpperCase(),
      price: parsed.p,
      quantity: parsed.q,
      time: parsed.T,
      action: parsed.m ? "sell" : "buy", // typo fixed: 'acction' → 'action'
    };

    const sockets = clients[symbol];
    if (sockets) {
      for (const socket of sockets) {
        socket.emit(`price:update:${symbol}`, priceData);
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
  subscribeToBinance: (socket, symbol) => {
    if (!clients[symbol]) clients[symbol] = new Set();
    clients[symbol].add(socket);

    if (!streams[symbol]) {
      createBinanceStream(symbol);
    }
  },

  unsubscribeFromBinance: (socket, symbol) => {
    if (clients[symbol]) {
      clients[symbol].delete(socket);
      if (clients[symbol].size === 0) {
        streams[symbol]?.close();
        delete clients[symbol];
      }
    }
  }
};
