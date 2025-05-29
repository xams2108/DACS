const Service = require("../../services/API/notify.service")
module.exports.index = async (req, res) => {

}
module.exports.postNotify = async (req, res) => {
  try {
    const { user, body } = req;

    if (!body?.symbol || !body?.price) {
      return res.status(400).json({ message: 'Missing symbol or price' });
    }

    await Service.createNotification(user, body);

    return res.status(200).json({
      success: true,
      message: 'Notification created successfully',
    });

  } catch (error) {
    console.error('❌ Error in postNotify:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
