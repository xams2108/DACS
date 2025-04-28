import { getData } from "../../utils/apiRequest";

const getCoins = async (key) => {
    try {
        const data = await getData(`api/market/cryptocurrency?search=${key ? key : ''}`);
        return data;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách coins:', error.message);
        throw error; 
    }
};

export default getCoins;