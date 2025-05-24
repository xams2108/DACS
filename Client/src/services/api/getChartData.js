import { getData } from "../../utils/apiRequest";

const getChartData = async (params) => {
    const symbol = params.symbol;
    const interval = params.interval;
    const skip = params.skip || '0'
    
    try {
        if (!symbol || typeof symbol !== 'string') {
            throw new Error('Symbol must be a non-empty string');
        }
        if (!interval || typeof interval !== 'string') {
            throw new Error('Interval must be a non-empty string');
        }
        const data = await getData(`api/market/cryptocurrency/chart/${symbol}/${interval}?skip=${skip}`);
        return data;
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu biểu đồ:', error.message);
        throw error; 
    }
};

export default getChartData;