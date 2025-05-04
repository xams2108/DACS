const Symbols = require("../../model/symbol.model");
const axios = require('axios');
const { updateCandle } = require("./ws.updateCandle")
const getIntervalMilliseconds = require("../../helper/getIntervalMilliseconds.helper");
// GET Symbols
module.exports.index = async (req, res) => {
    try {
        const find = {
            status: "TRADING"
        };
        if (req.query.search && req.query.search.trim() !== "") {
            const searchRegex = new RegExp(req.query.search, 'i'); 
            find.symbol = { $regex: searchRegex }; 
        }
        let limit = 30; 
        if (req.query.limit) {
            limit = parseInt(req.query.limit);
        }
        const data = await Symbols.find(find).limit(limit);
        res.status(200).json({
            success: true,
            data: data
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching symbols',
            error: error.message
        });
    }
};

module.exports.chart = async(req,res)  => {
    const symbol = req.params.symbol
    const validIntervals = ['1m', '5m', '15m', '30m', '1h', '2h', '4h', '6h', '8h', '12h', '1d', '3d', '1w', '1M'];
    let limit = 100;
    let skip = req.query.skip ? parseInt(req.query.skip) : 0;
    if(!symbol){
        res.status(400).json({
            message: 'không có symbol',
        })
        return 
    }
    exitsSymbol = await Symbols.findOne({symbol: symbol})
    if(!exitsSymbol){
        res.status(400).json({
            message: 'Symbol không tồn tại',
        })
        return 
    }

    if(req.params.interval && validIntervals.includes(req.params.interval)){
        interval = req.params.interval
    }
    if(req.params.limit){
        limit = parseInt(req.query.limit)
    }
    
    try{
        let endTime = Date.now();
        if (skip > 0) {
            const intervalMilliseconds = getIntervalMilliseconds(interval);
            endTime = Date.now() - (skip * 100 * intervalMilliseconds);
        }
        const response = await axios.get(`https://api.binance.com/api/v3/klines`, {
            params: {
                symbol: symbol.toUpperCase(),
                interval: interval,
                limit: limit,
                endTime: endTime
            }
        });
        const priceHistory = response.data.map(item => ({
            openTime: item[0],
            open: item[1],
            high: item[2],
            low: item[3],
            close: item[4],
            volume: item[5]
        }));

        res.status(200).json({
            success: true,
            data: priceHistory
        });

        
    }catch (error){
        res.status(500).json({
            success: false,
            message: 'Error fetching price history',
            error: error.message
        });
    }
}
