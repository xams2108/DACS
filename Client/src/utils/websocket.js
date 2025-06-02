// utils/websocketUtil.js
import { io } from 'socket.io-client';

const SOCKET_SERVER_URL = import.meta.env.VITE_APP_WS_URL;
const sockets = {
  public: null,
  private: null,
};

const connect = (type = 'public', token = null) => {
  const namespace = type === 'private' ? '/private' : '/public';

  if (sockets[type]) return; // Đã kết nối rồi

  const url = SOCKET_SERVER_URL + namespace;
  const options = {
    transports: ['websocket'],
    withCredentials: true,
    ...(token ? { auth: { token } } : {}),
  };

  const socket = io(url, options);

  socket.on('connect', () => {
    console.log(`🟢 Connected (${type}):`, socket.id);
  });

  socket.on('disconnect', () => {
    console.log(`🔴 Disconnected (${type})`);
  });

  socket.on('connect_error', (err) => {
    console.error(`❌ Connection error (${type}):`, err.message);
  });

  sockets[type] = socket;
};

const send = (type, event, data) => {
  sockets[type]?.emit(event, data);
};

const on = (type, event, callback) => {
  sockets[type]?.on(event, callback);
};

const off = (type, event, callback) => {
  sockets[type]?.off(event, callback);
};

const disconnect = (type) => {
  if (sockets[type]) {
    sockets[type].disconnect();
    sockets[type] = null;
  }
};

export default {
  connect,
  send,
  on,
  off,
  disconnect,
};
