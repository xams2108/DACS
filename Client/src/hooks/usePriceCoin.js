import { useEffect, useState } from 'react';
import websocketUtil from '../utils/websocket';

const useRealtimePrice = (symbol, streams = 'ticker') => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!symbol || !streams) return;
    const namespace = 'public';
    const eventName = `price:update:${symbol}@${streams}`;
    websocketUtil.connect(namespace);
    websocketUtil.send(namespace, 'subscribe:token', { symbol, streams });

    const handlePriceUpdate = (incomingData) => {
      setData(incomingData);
    };
    websocketUtil.on(namespace, eventName, handlePriceUpdate);

    return () => {
      websocketUtil.send(namespace, 'unsubscribe:token', { symbol, streams });
      websocketUtil.off(namespace, eventName, handlePriceUpdate);
      websocketUtil.disconnect("public")
      
    };
  }, [symbol, streams]);

  return { data };
};

export default useRealtimePrice;
