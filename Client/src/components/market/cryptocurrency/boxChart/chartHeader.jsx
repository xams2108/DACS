import React, { useState } from 'react';
import './Header.scss';

function Header() {
  const [interval, setInterval] = useState('15M');
  const listInterval = ['1M', '15M', '30M', '1D', '1W', '1MO', '3MO', '1Y'];

  const handleInterval = (item) => {
    setInterval(item);
  };

  return (
    <div className="chart-header">
      <div className="chart-header__left">
        <div className="chart-header__left__title">BTC / USDT</div>
      </div>
      <div className="chart-header__right">
        {listInterval.map((item, index) => (
          <div
            key={index}
            className={`chart-header__right__item ${interval === item ? ' chart-header__right__item--active' : ''}`}
            onClick={() => handleInterval(item)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Header;