// SymbolItem.jsx
import React from "react";
import "./SymbolItem.scss";
import usePriceCoin from "../../../../hooks/usePriceCoin";

function SymbolItem({ coin }) {
  const { data: coinData } = usePriceCoin(coin.symbol, "ticker");

  const priceRaw = coinData?.data?.c 
  const changeRaw = coinData?.data?.P 

  const formatNumber = (value) => {
  if (value === null || value === undefined) return "0.00";
  const num = typeof value === "number" ? value : parseFloat(value);
  return isNaN(num) ? "0.00" : num.toFixed(2);
};
    const price = formatNumber(priceRaw);
    const change = formatNumber(changeRaw);

  return (
    <div className="symbol-item">
      <div className="symbol-item__right">
        <span className="symbol-item__symbol-name">
          {coin.symbol}/{coin.quoteAsset}
        </span>
      </div>
      <div className="symbol-item__left">
        <span className="symbol-item__price">{price}</span>
        <span
          className={`symbol-item__change ${
            parseFloat(change) >= 0 ? "positive" : "negative"
          }`}
        >
          {change}%
        </span>
      </div>
    </div>
  );
}

export default SymbolItem;
