const Notify = require('../../model/notify.model');
const getPrice = require('./cryptocurrency.service')
module.exports.createNotification = async (user, data) => {
  const newNotify = new Notify({
    address: user.address,
    symbol: data.symbol,
    price: data.price
  });
  await newNotify.save();
};

module.exports.checkAndNotify = async () => {
  try {
    const alerts = await Notify.find({ success: false });
    if (!alerts.length) return;

    const uniqueSymbols = [...new Set(alerts.map(alert => alert.symbol))];
    const prices = await Promise.all(
      uniqueSymbols.map(async (symbol) => {
        try {
          const response = await getPrice(symbol);
          return { symbol, price: parseFloat(response.price) };
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
        if (currentPrice >= alert.price) {
          console.log(`🔔 Notify ${alert.address}: ${symbol} >= ${alert.price}`);

          alert.success = true;
          await alert.save();
        }
      }
    }
  } catch (error) {
    console.error('❌ Lỗi trong checkAndNotify:', error.message);
  }
};
