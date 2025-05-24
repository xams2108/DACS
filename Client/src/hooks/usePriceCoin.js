import { useEffect, useState } from 'react';
import websocketUtil from '../utils/websocket';

const useRealtimePrice = (symbol, streams) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!symbol) return;

    websocketUtil.connect();
    websocketUtil.send('subscribe:token', { symbol, streams });
    const handlePriceUpdate = (data1) => {
      setData(data1);
    };

    websocketUtil.on(`price:update:${symbol}@${streams}`, handlePriceUpdate);

    return () => {
      websocketUtil.send('unsubscribe:token', { symbol, streams });
      websocketUtil.off(`price:update:${symbol}@${streams}`, handlePriceUpdate);
      websocketUtil.disconnect();
    };
  }, [symbol, streams]);

  return { data };
};

export default useRealtimePrice;