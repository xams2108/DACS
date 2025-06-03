
import { getData } from "../../utils/apiRequest";

const getCoins = async (key, query = "search") => {
    try {
        const data = await getData(`api/market/cryptocurrency?${query}=${key ? key : ''}`);
        return data;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách coins:', error.message);
        throw error; 
    }
};

export default getCoins;