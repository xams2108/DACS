const socketAuthMiddleware = require('../middlewares/socketAuth.middlewares');
const initPublicSocket = require('./public');
const initPrivateSocket = require('./private');

module.exports = (io) => {
  const publicNamespace = io.of('/public');
  publicNamespace.on('connection', (socket) => {
    initPublicSocket(socket, publicNamespace);
  });

  // Namespace: /private — có xác thực
  const privateNamespace = io.of('/private');
  privateNamespace.use(socketAuthMiddleware);
  privateNamespace.on('connection', (socket) => {
    initPrivateSocket(socket, privateNamespace);
    
  });
};
