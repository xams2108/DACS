import { useState, useEffect } from 'react';
import getTrendingCoins from '../../services/api/cointrending.api';

function CoinTrending() {
    const [dataTrending, setDataTrending] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const data = await getTrendingCoins();
                setDataTrending(data.coins); // Đảm bảo lấy đúng dữ liệu
                console.log(data);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu trending coins:", error);
            }
        };
        fetchApi();
    }, []); // Đặt mảng phụ thuộc đúng vị trí

    return (
      <>
        
      </>
    );
}

export default CoinTrending;