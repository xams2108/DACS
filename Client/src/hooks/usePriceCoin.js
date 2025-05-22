import { useEffect, useState } from 'react';
import websocketUtil from '../utils/websocket';

const useRealtimePrice = (symbol) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!symbol) return;

    websocketUtil.connect();  
    websocketUtil.send('subscribe:token', symbol);
    const handlePriceUpdate = (data1) => {
      setData(data1);
    };

    websocketUtil.on(`price:update:${symbol}`, handlePriceUpdate);

    return () => {
      websocketUtil.send('unsubscribe:token', symbol);
      websocketUtil.off(`price:update:${symbol}`, handlePriceUpdate);
      websocketUtil.disconnect();
    };
  }, [symbol]);

  return { data };
};

export default useRealtimePrice;