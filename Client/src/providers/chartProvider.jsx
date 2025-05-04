
import React, { createContext, useState, useContext } from 'react';
const ChartContext = createContext();


export const ChartProvider = ({ children }) => {
  const [symbol, setSymbol] = useState('BTCUSDT');
  const [interval, setInterval] = useState('15m'); 


  const value = {
    symbol,
    setSymbol,
    interval,
    setInterval
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