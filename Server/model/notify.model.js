const mongoose = require("mongoose");

const notifySchema = new mongoose.Schema({
  address: {type: String, required: true},
  symbol: { type: String, required: true},
  price: { type: Number, required: true},
  success: { type: Boolean, default: false},
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Notify", notifySchema);