const mongoose = require('mongoose');
const { types } = require('web3');

const symbolSchema = new mongoose.Schema({
    symbol: {
        type: String,
        required: true,
        unique: true 
    },
    baseAsset: {
        type: String,
        required: true
    },
    quoteAsset: {
        type: String,
        required: true
    },
    icon: {
        default: "https://e7.pngegg.com/pngimages/398/669/png-clipart-coin-computer-icons-information-coin-text-gold-coin-thumbnail.png",
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['TRADING', 'SUSPENDED', 'TERMINATED'], 
        default: 'TRADING'
    }
});

const Symbol = mongoose.model('Symbol', symbolSchema);

module.exports = Symbol;