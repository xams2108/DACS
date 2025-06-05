import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const ChartContext = createContext();

export const ChartProvider = ({ children }) => {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const initialSymbol = params.symbol || 'BTCUSDT';
  const initialInterval = params.interval || '15m';

  const [symbol, setSymbol] = useState(initialSymbol);
  const [interval, setInterval] = useState(initialInterval);

  useEffect(() => {
    if (params.symbol && params.symbol !== symbol) {
      setSymbol(params.symbol);
    }
    if (params.interval && params.interval !== interval) {
      setInterval(params.interval);
    }
  }, [params.symbol, params.interval]);
  useEffect(() => {
    const currentPath = `/market/cryptocurrency/${symbol}/${interval}`;
    if (location.pathname !== currentPath) {
      navigate(currentPath, { replace: true });
    }
  }, [symbol, interval, location.pathname, navigate]);
  const value = {
    symbol,
    setSymbol,
    interval,
    setInterval,
  };

  return (
    <ChartContext.Provider value={value}>
      {children}
    </ChartContext.Provider>
  );
};

export const useChartProvider = () => {
  return useContext(ChartContext);
};
