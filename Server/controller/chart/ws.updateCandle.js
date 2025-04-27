const WebSocket = require('ws');

const candles = {};

const updateCandle = (symbol, interval) => {
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toUpperCase()}@trade`);
    const intervalSeconds = parseIntervalToSeconds(interval);
    
    ws.on('open', () => {
        console.log(`WebSocket connection established for symbol: ${symbol}, interval: ${interval}`);
    });

    ws.on('message', (data) => {
        const trade = JSON.parse(data);
        const candleTime = Math.floor(trade.T / (intervalSeconds * 1000)) * (intervalSeconds * 1000);
        
        if (!candles[candleTime]) {
            candles[candleTime] = {
                open: parseFloat(trade.p),
                high: parseFloat(trade.p),
                low: parseFloat(trade.p),
                close: parseFloat(trade.p),
                volume: parseFloat(trade.q),
                openTime: candleTime
            };
        } else {
            const candle = candles[candleTime];
            candle.high = Math.max(candle.high, parseFloat(trade.p));
            candle.low = Math.min(candle.low, parseFloat(trade.p));
            candle.close = parseFloat(trade.p);
            candle.volume += parseFloat(trade.q);
        }
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });

    ws.on('close', () => {
        console.log('WebSocket connection closed');
    });
};


const parseIntervalToSeconds = (interval) => {
    const timeUnit = interval.slice(-1); 
    const value = parseInt(interval.slice(0, -1)); 

    switch (timeUnit) {
        case 'm': 
            return value * 60;
        case 'h': 
            return value * 60 * 60;
        case 'd': 
            return value * 60 * 60 * 24;
        case 'w':
            return value * 60 * 60 * 24 * 7;
        case 'M':
            return value * 60 * 60 * 24 * 30;
        default:
            throw new Error('Invalid interval format.');
    }
};

module.exports = { updateCandle };