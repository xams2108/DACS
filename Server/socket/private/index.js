const orderSocket = require("./order.socket")
const UsersSocket = require("../../helper/userSocket")
module.exports = (socket) => {
    UsersSocket.addUser(socket.user.address, socket.id)
    const user = UsersSocket.getAllUsers()
    console.log(user)
    // orderSocket(socket.id)
};
