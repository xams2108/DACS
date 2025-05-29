import { getData } from "../../utils/apiRequest";

const getPrice = async (key) => {
    try {
        const data = await getData(`api/market/cryptocurrency/price?symbol=${key ? key : 'BTCUSDT'}`);
        return data;
    } catch (error) {
        console.error('Lỗi khi giá coin:', error.message);
        throw error; 
    }
};

export default getPrice;