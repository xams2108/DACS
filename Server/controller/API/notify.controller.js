const Service = require("../../services/API/order.service")
module.exports.index = async (req, res) => {

}
module.exports.postOrder = async (req, res) => {
  try {
    const { user, body } = req;

    if (!body?.symbol || !body?.price) {
      return res.status(400).json({ message: 'Missing symbol or price' });
    }

    await Service.createOrder(user, body);

    return res.status(200).json({
      success: true,
      message: 'Order created successfully',
    });

  } catch (error) {
    console.error('❌ Error in postOrder:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
