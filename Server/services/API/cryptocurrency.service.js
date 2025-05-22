const Symbols = require('../../model/symbol.model');
const axios = require('axios');
const getIntervalMilliseconds = require('../../helper/getIntervalMilliseconds.helper');

// Lấy danh sách symbol
exports.getSymbols = async (query) => {
    const find = { status: 'TRADING' };

    if (query.search && query.search.trim() !== '') {
        const searchRegex = new RegExp(query.search, 'i');
        find.symbol = { $regex: searchRegex };
    }

    const limit = query.limit ? parseInt(query.limit) : 30;

    return await Symbols.find(find).limit(limit);
};

// Lấy dữ liệu chart
exports.getChart = async (params, query) => {
    const symbol = params.symbol;
    const interval = params.interval;
    const validIntervals = ['1m', '5m', '15m', '30m', '1h', '2h', '4h', '6h', '8h', '12h', '1d', '3d', '1w', '1M'];

    if (!symbol) throw new Error('Không có symbol');

    const existsSymbol = await Symbols.findOne({ symbol: symbol });
    if (!existsSymbol) throw new Error('Symbol không tồn tại');

    if (!validIntervals.includes(interval)) {
        throw new Error('Interval không hợp lệ');
    }

    const limit = query.limit ? parseInt(query.limit) : 100;
    const skip = query.skip ? parseInt(query.skip) : 0;

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

    return response.data.map(item => ({
        openTime: item[0],
        open: item[1],
        high: item[2],
        low: item[3],
        close: item[4],
        volume: item[5]
    }));
};
