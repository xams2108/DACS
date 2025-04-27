
const mongoose = require("mongoose");

const symbolSchema = new mongoose.Schema({
  symbol: { type: String, required: true, unique: true },
  baseAsset: { type: String, required: true },
  quoteAsset: { type: String, required: true },
  status: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Symbol", symbolSchema);