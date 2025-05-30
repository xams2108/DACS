const Order = require('../../model/order.model');
const Service = require('./cryptocurrency.service')
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

module.exports.checkAndNotify = async () => {
  try {
    const alerts = await Order.find({ success: false });
    if (!alerts.length) return;
    const uniqueSymbols = [...new Set(alerts.map(alert => alert.symbol))];
    const prices = await Promise.all(
      uniqueSymbols.map(async (symbol) => {
        try {
          const res = await Service.getPrice(symbol);
          return res;
        } catch (error) {
          console.error(`Lỗi khi lấy giá của ${symbol}:`, error.message);
          return null;
        }
      })
    );
    const validPrices = prices.filter(Boolean);

    for (const { symbol, price: currentPrice } of validPrices) {
      const symbolAlerts = alerts.filter(alert => alert.symbol === symbol);

      for (const alert of symbolAlerts) {
        if(alert.action == "sell"){
            if (currentPrice >= alert.price) {
              console.log(`🔔 Notify ${alert.address}: ${symbol} >= ${alert.price}`);

              alert.status = "success";
              await alert.save();
          }
        }else if(alert.action == "buy"){
            if (currentPrice <= alert.price) {
              console.log(`🔔 Notify ${alert.address}: ${symbol} >= ${alert.price}`);

              alert.status = "success";
              await alert.save();
          }
        }
        
      }
    }
  } catch (error) {
    console.error('❌ Lỗi trong checkAndNotify:', error.message);
  }
};
