const UsersSocket = [];
module.exports.addUser = (address, socketId) => {
  const exists = UsersSocket.find(user => user.address === address);
  if (exists) {
    exists.socketId = socketId;
  } else {
    UsersSocket.push({ address, socketId });
  }
};

module.exports.removeUserBySocket = (socketId) => {
  const index = UsersSocket.findIndex(user => user.socketId === socketId);
  if (index !== -1) {
    UsersSocket.splice(index, 1);
  }
};

module.exports.getSocketByAddress = (address) => {
  const user = UsersSocket.find(user => user.address === address);
  return user ? user.socketId : null;
};

module.exports.getAllUsers = () => {
  return [...UsersSocket]; 
};
