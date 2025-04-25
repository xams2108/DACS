const { Web3 } = require("web3")
const jwt = require("jsonwebtoken")
const User = require("../model/user.model");
const mongoose = require("mongoose");

const web3 = new Web3();

// GET info user api/user/
module.exports.getinfoUser = async (req, res) => {
  try {
    const { wallet } = req.body;
    if (!wallet || !web3.utils.isAddress(wallet)) {
      return res.status(400).json({ error: "Địa chỉ ví không hợp lệ" });
    }
    const normalizedWallet = wallet.toLowerCase();

    const user = await User.findOne({ walletAddress: normalizedWallet })
      .select('-nonce -createdAt -updatedAt');

    if (!user) {
      return res.status(404).json({ error: "Không tìm thấy user" });
    }

    res.status(200).json({
      wallet: user.walletAddress,
      profile: user.profile,
      statusNotify: user.statusNotify
    });

  } catch (error) {
    console.error("Lỗi getUserInfo:", error);
    res.status(500).json({ error: "Lỗi server khi truy vấn user" });
  }
}

// POST connect wallet
module.exports.connectWallet = async (req, res) => {
  try {
    const { wallet } = req.body;
    if (!wallet || !web3.utils.isAddress(wallet)) {
      return res.status(400).json({ error: "Địa chỉ ví không hợp lệ hoặc không có" });
    }

    const normalizedWallet = wallet.toLowerCase();
    const nonce = Math.floor(Math.random() * 1000000).toString();
    
    const user = await User.findOneAndUpdate(
      { walletAddress: normalizedWallet },
      { nonce },
      { upsert: true, new: true }
    );

    res.status(200).json({
      walletAddress: user.walletAddress,
      nonce,
      message: "Kết nối thành công"
    });
  } catch (error) {
    console.error("Lỗi connectWallet:", error);
    return res.status(500).json({ error: "Lỗi server trong quá trình connect wallet" });
  }
}

// POST sign wallet
module.exports.verifySignature = async (req, res) => {
  const { wallet, signature } = req.body;
  if (!wallet || !signature) {
    return res.status(400).json({ error: 'Địa chỉ ví hoặc Chữ ký chưa có' });
  }
  
  try {
    const user = await User.findOne({ walletAddress: wallet }).select('+nonce');
    if (!user || !user.nonce) {
      return res.status(404).json({ error: 'Không tìm thấy user hoặc chưa có nonce' });
    }

    const message = `Signing nonce: ${user.nonce}`;
    const recoveredAddress = web3.eth.accounts.recover(message, signature);

    if (recoveredAddress.toLowerCase() !== wallet.toLowerCase()) {
      return res.status(401).json({ error: 'Chữ ký không hợp lệ' });
    }

    // Tạo JWT token
    const token = jwt.sign(
      { walletAddress: user.walletAddress },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Reset nonce
    user.nonce = undefined;
    await user.save();

    res.status(200).json({
      token,
      walletAddress: user.walletAddress,
      message: "Xác thực thành công"
    });

  } catch (error) {
    console.error("Lỗi verifySignature:", error);
    res.status(500).json({ error: "Lỗi server khi xác thực chữ ký" });
  }
}