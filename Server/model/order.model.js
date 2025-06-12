const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  address: {type: String, required: true},
  type: {type: String,enum: ["notify", "trade"], require: true},
  symbol: { type: String, required: true},
  price: { type: Number, required: true},
  action: {type: String,enum: ["buy", "sell"], require: true},
  status: {
    type: String,
    enum: ['pending', 'success'],
    default: 'pending',
    required: true,
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);