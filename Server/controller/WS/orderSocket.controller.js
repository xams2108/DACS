
const Service = require('../../services/WS/order.service');

const notifyOrder = async (socket) => {
    Service.checkAndNotify(socket)
};

module.exports = { notifyOrder };
