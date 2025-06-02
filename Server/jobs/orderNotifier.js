
const { checkAndNotify } = require('../services/API/order.service');

let intervalId = null;

module.exports.startOrderNotifier = () => {
  if (intervalId) {
    return;
  }


  intervalId = setInterval(() => {
    checkAndNotify();
  }, 10000); 
};
