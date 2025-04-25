import { useEffect, useState } from 'react';
const useGetPriceCoin = (symbol) => {
    const [price, setPrice] = useState(null);
    useEffect(() => {
        const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@ticker`);

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setPrice(data); 
        };

        ws.onerror = (error) => {
            console.error('WebSocket Error:', error);
        };

        return () => {
            ws.close();
        };
    }, [symbol]);

    return price;
};

export default useGetPriceCoin;