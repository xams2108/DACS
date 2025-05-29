const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  code: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 180 }, 
  isUsed: { type: Boolean, default: false },
});

module.exports = mongoose.model('OTP', otpSchema);
