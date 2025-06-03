import './BoxCoin.scss';
import { useState, useEffect } from 'react';
import usePriceCoin from "../../../hooks/usePriceCoin"; 
import getCoin from "../../../services/api/getCoins.api";
import Chart from "./Chart";
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

function BoxCoin({ symbol }) {
  const [coinInfo, setCoinInfo] = useState(null);
  const price = usePriceCoin(symbol + "usdt")?.data?.data;

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await getCoin(symbol + "usdt", "symbol");
        setCoinInfo(response.data[0]);
      } catch (error) {
        console.error("❌ Error fetching coin info:", error);
      }
    };

    fetchInfo();
  }, [symbol]);

  const priceChangePercent = parseFloat(price?.P || 0);
  const isUp = priceChangePercent >= 0;

  return (
    <div className="BoxCoin-item">
      <div className="BoxCoin-item__left">
        <div className='BoxCoin-item__left__header'>
          <div className="BoxCoin-item__left__header__icon">
            <img src={coinInfo?.icon} alt={symbol} />
          </div>
          <div className="BoxCoin-item__left__header__title">
            {symbol.toUpperCase()}
          </div>
        </div>

        <div className='BoxCoin-item__left__bottom'>
          <div className="BoxCoin-item__left__bottom__price">
            ${parseFloat(price?.c || 0).toFixed(2)}
          </div>

          <div
            className="BoxCoin-item__left__bottom__change"
            style={{ color: isUp ? "#66bb6a" : "#f44336" }}
          >
            {isUp ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            {" "}
            {isUp ? "+" : ""}
            {priceChangePercent.toFixed(2)}%
          </div>
        </div>
      </div>

      <div className="BoxCoin-item__right">
        <Chart symbol={symbol + "usdt"} />
      </div>
    </div>
  );
}

export default BoxCoin;
