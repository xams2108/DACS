
import io from 'socket.io-client';

const SOCKET_URL = 'http://your-backend-url'; // Thay bằng URL backend của bạn

let socket = null;

export const connectToPriceUpdates = (symbol, interval, callback) => {
    if (!socket) {
        socket = io(SOCKET_URL, {
            transports: ['websocket'],
            reconnection: true,
            reconnectionAttempts: 5,
        });

        socket.on('connect', () => {
            console.log(`Connected to WebSocket for ${symbol}@${interval}`);
        });

        socket.on('candle_update', (data) => {
            if (data.symbol === symbol && data.interval === interval) {
                callback(data); // Gọi callback với dữ liệu giá real-time
            }
        });

        socket.on('candle_error', (error) => {
            console.error('WebSocket error:', error);
        });

        socket.on('disconnect', () => {
            console.log('WebSocket disconnected');
        });
    }

    return () => {
        if (socket) {
            socket.disconnect();
            socket = null;
            console.log('WebSocket connection closed');
        }
    };
};