const Service = require("../../services/API/order.service")
module.exports.index = async (req, res) => {
  const { address} = req.user
  const respone = await Service.getOrder(address, req.query)
  return res.status(200).json(respone)
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
module.exports.deleteOrder = async (req, res) => {
  const {id} = req.params;
  if(!id){
    return res.status(400).json({status: false, message: 'Missing required field: id'});
  }
  const {address} = req.user
  const respone = await Service.deleteOrder(id, address);
  if(respone.success){
    return res.status(200).json(respone)
  }else{
    return res.status(400).json(respone)
  }
};

