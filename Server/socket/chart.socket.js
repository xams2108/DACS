const WebSocket = require("ws");
const BINANCE_WS = "wss://stream.binance.com:9443/ws";

function createBinanceStream(symbol) {
  const streamSymbol = symbol.toLowerCase() + "@ticker";
  return new WebSocket(`${BINANCE_WS}/${streamSymbol}`);
}

module.exports.registerChartSocket = () => {
  _io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    let binanceWS = null;
    socket.on("subscribeSymbol", (symbol) => {
      const streamSymbol = symbol.toLowerCase();

      console.log(`Client ${socket.id} subscribed to ${streamSymbol}`);
      binanceWS = createBinanceStream(streamSymbol);
      binanceWS.on("message", (msg) => {
        const data = JSON.parse(msg);
        socket.emit("realtimePrice", {
          symbol: data.s,
          price: data.c,
          high: data.h,
          low: data.l,
          volume: data.v,
          time: data.E
        });
      });

      binanceWS.on("error", (err) => {
        console.error("Binance WS Error:", err.message);
      });
    });
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
      if (binanceWS) binanceWS.close();
    });
  });
};
