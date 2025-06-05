const cryptocurrencyService = require('../../services/API/cryptocurrency.service');
const Symbol = require('../../model/symbol.model');
const axios = require('axios');
// GET Symbols
exports.index = async (req, res) => {
    try {
        
        const result = await cryptocurrencyService.getSymbols(req.query);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching symbols',
            error: error.message
        });
    }
};

// Get Price
exports.price = async(req,res) => {
    try{
        const result = await cryptocurrencyService.getPrice(req.query.symbol);
        res.status(200).json({ success: true, data: result });
    }catch(error){
         res.status(500).json({
            success: false,
            message: error.message || 'Error fetching price lastest'
        });
    }
}
// GET Chart
exports.chart = async (req, res) => {
    try {
        const result = await cryptocurrencyService.getChart(req.params, req.query);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        
        res.status(500).json({
            success: false,
            message: error.message || 'Error fetching price history'
        });
    }
};
