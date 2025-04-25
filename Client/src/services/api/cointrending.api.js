import { getPublicData } from "../../utils/apiRequest";

const getTrendingCoins = async () => {
    try {
        const data = await getPublicData("https://api.coingecko.com/api/v3/search/trending");
        return data;
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu trending coins:", error);
        throw error;
    }
};

export default getTrendingCoins;