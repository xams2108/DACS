  const Order = require('../../model/order.model');
  const User = require("../../model/user.model");
  const Service = require('./cryptocurrency.service')
  const userSockets = require("../../helper/userSocket")
  const {sendEmail}= require("../../helper/email.helper")
  const path = require('path');
  const pug = require('pug');
  const fs = require('fs');
  module.exports.getOrder = async (address, query = {}) => {
    try {
      const filter = {
        address,
        ...(typeof query === "object" && query !== null ? query : {})
      };

      const orders = await Order.find(filter);

      if (!orders || orders.length === 0) {
        return { success: false, message: 'Order not found' };
      }
      return { success: true, data: orders };
    } catch (error) {
      return { success: false, message: 'Error occurred', error: error.message };
    }
  };


  module.exports.createOrder = async (user, data) => {
    const {price: priceMakert} = await Service.getPrice(data.symbol)
    const action = data.price > priceMakert? "sell": "buy";
    const newNotify = new Order({
      address: user.address,
      type: data.type,
      symbol: data.symbol,
      price: data.price,
      action: action
    });
    await newNotify.save();
  };
  module.exports.deleteOrder = async (_id, address) => {
    try {
      const deletedOrder = await Order.findOneAndDelete({ _id, address });
      if (!deletedOrder) {
        return { success: false, message: 'Order not found or already deleted' };
      }
      return { success: true, message: 'Order deleted successfully' };
    } catch (error) {
      console.error('Error deleting order:', error);
      return { success: false, message: error.message };
    }
  };


module.exports.checkAndNotify = async () => {
  try {
    const alerts = await Order.find({ status: "pending" });
    if (!alerts.length) return;
    const alertAddresses = [...new Set(alerts.map(alert => alert.address))];
    const uniqueSymbols = [...new Set(alerts.map(alert => alert.symbol))];
    const users = await User.find({ address: { $in: alertAddresses }, statusNotify: true });
    const prices = await Promise.all(
      uniqueSymbols.map(async (symbol) => {
        try {
          const { symbol: sym, price } = await Service.getPrice(symbol);
          return { symbol: sym, price };
        } catch (error) {
          return null;
        }
      })
    );

    const validPrices = prices.filter(Boolean);

    for (const { symbol, price: currentPrice } of validPrices) {
      const symbolAlerts = alerts.filter(alert => alert.symbol === symbol);

      for (const alert of symbolAlerts) {
        const { action, price: targetPrice, address } = alert;

        let shouldNotify = false;
        if (action === 'sell' && currentPrice >= targetPrice) shouldNotify = true;
        if (action === 'buy' && currentPrice <= targetPrice) shouldNotify = true;

        if (!shouldNotify) continue;

        const socketId = await userSockets.getSocketByAddress(address);
        const payload = { symbol, currentPrice, targetPrice, action, time: new Date() };

        if (socketId) {
          _io.of('/private').to(socketId).emit('notify', payload);
        }

        const userHasNotify = users.find(user => user.address === address);

        if (userHasNotify && userHasNotify.email) {
          const templatePath = path.join(__dirname, '../../templates/alertPrice.pug');
          const html = pug.renderFile(templatePath, {
            email: userHasNotify.email,
            symbol,
            currentPrice,
            targetPrice,
            actionLink: process.env.CLIENT_DOMAIN,
          });

          try {
            console.log(userHasNotify.email)
            await sendEmail(userHasNotify.email,"Alert price",html);
          } catch (emailError) {

          }
        } else {
        }

        alert.status = 'success';
        await alert.save();
      }
    }
  } catch (error) {
    console.error('❌ Lỗi trong checkAndNotify:', error.message);
  }
};