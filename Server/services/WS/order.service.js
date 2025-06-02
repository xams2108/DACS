const Order = require('../../model/order.model');
const Service = require("../API/cryptocurrency.service");
const userSockets = require('../../helper/userSocket'); // đảm bảo đúng đường dẫn

const checkAndNotify = async (socket) => {
  try {
    const alerts = await Order.find({ success: false });
    if (!alerts.length) return;

    const uniqueSymbols = [...new Set(alerts.map(alert => alert.symbol))];

    const prices = await Promise.all(
      uniqueSymbols.map(async (symbol) => {
        try {
          const { symbol: sym, price } = await Service.getPrice(symbol);
          return { symbol: sym, price };
        } catch (error) {
          console.error(`❌ Lỗi khi lấy giá của ${symbol}:`, error.message);
          return null;
        }
      })
    );

    const validPrices = prices.filter(Boolean);

    for (const { symbol, price: currentPrice } of validPrices) {
      const symbolAlerts = alerts.filter(alert => alert.symbol === symbol);

      for (const alert of symbolAlerts) {
        let shouldNotify = false;

        if (alert.action === 'sell' && currentPrice >= alert.price) {
          shouldNotify = true;
        } else if (alert.action === 'buy' && currentPrice <= alert.price) {
          shouldNotify = true;
        }

        if (shouldNotify) {
          const socketInfo = userSockets.getUserByAddress(alert.address);
          if (socketInfo && socketInfo.socketId) {
            const payload = {
              symbol,
              currentPrice,
              targetPrice: alert.price,
              action: alert.action,
              time: new Date(),
            };

            _io.to(socketInfo.socketId).emit('notify', payload);
            console.log(`📢 Notify to ${alert.address} (${alert.action}): ${symbol} @ ${currentPrice}`);
          } else {
            console.log(`⚠️ Không tìm thấy socket đang online cho ${alert.address}`);
          }

          alert.status = 'success';
          await alert.save();
        }
      }
    }
  } catch (error) {
    console.error('❌ Lỗi trong checkAndNotify:', error.message);
  }
};

module.exports = { checkAndNotify };
