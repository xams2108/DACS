const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
  
  walletAddress: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => /^0x[a-fA-F0-9]{40}$/.test(v),
      message: 'Invalid Ethereum address'
    }
  },

  nonce: {
    type: String,
    default: () => Math.floor(Math.random() * 1000000).toString(),
    select: false
  },

  // Thông tin profile (tuỳ chọn)
  profile: {
    username: String,
    email: String,
    
    avatar: String 
  },
  statusNotify: {
    type: Boolean,
    default: true
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;