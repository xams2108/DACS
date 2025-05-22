// utils/websocketUtil.js
import { io } from 'socket.io-client';

let socket = null;

const SOCKET_SERVER_URL = import.meta.env.VITE_APP_WS_URL;

const connect = (token = null) => {
  if (!socket) {
    const options = token
      ? { transports: ['websocket'], auth: { token }, withCredentials: true }
      : { transports: ['websocket'], withCredentials: true };
    socket = io(SOCKET_SERVER_URL, options);
    socket.on('connect', () => {
      console.log('🟢 Connected:', socket.id);
    });

    socket.on('disconnect', () => {
      console.log('🔴 Disconnected');
    });

    socket.on('connect_error', (err) => {
      console.error('❌ Connection error:', err.message);
    });
  }
};

const send = (event, data) => {
  socket?.emit(event, data);
};

const on = (event, callback) => {
  socket?.on(event, callback);
};

const off = (event, callback) => {
  socket?.off(event, callback);
};

const disconnect = () => {
  socket?.disconnect();
  socket = null;
};

export default {
  connect,
  send,
  on,
  off,
  disconnect,
};
