import './trending.scss';
import React from 'react';
import { Card } from 'antd';
import { FireTwoTone, CaretUpFilled, CaretDownFilled } from '@ant-design/icons';

function TrendingNFT({ data = [], title }) {
    let result = [];
    if (title.includes("NFT")) {
        result = data.map((item) => ({
            name: item.name,
            price: item.data.floor_price,
            thumb: item.thumb,
            priceChange: parseFloat(item.data.floor_price_in_usd_24h_percentage_change).toFixed(2),
        }));
    } else {
        result = data.map((item) => ({
            name: item.item.name,
            symbol: item.item.symbol,
            price: item.item.data.price.toFixed(4),
            thumb: item.item.thumb,
            priceChange: parseFloat(item.item.data.price_change_percentage_24h.usd || 0).toFixed(2),
            marketCap: formatMarketCap(item.item.data.market_cap)
        }));
    }

    function formatMarketCap(marketCap) {
        if (!marketCap) return 'N/A';
        const numericValue = parseFloat(marketCap.replace(/[^0-9.]/g, ''));
        return numericValue.toLocaleString('en-US');
    }

    return (
        <div className="trending-card">
            <div className="card-header">
                <div className='header-title'>
                    <span>{title}</span>
                </div>
            </div>
            <div className='card-content'>
                {result.map((item, index) => (
                    <div className='coin-item' key={index}>
                        <div className='coin-rank'>{index + 1}</div>
                        <div className='coin-info'>
                            <div className='coin-thumbnail'>
                                <img src={item.thumb} alt={item.name} />
                            </div>
                            <div className='coin-details'>
                                <span className='coin-name'>{item.name}</span>
                                {item.symbol && <span className='coin-symbol'>{item.symbol.toUpperCase()}</span>}
                            </div>
                        </div>
                        <div className='coin-stats'>
                            <div className='coin-price'>${item.price}</div>
                            {!title.includes("NFT") && item.marketCap && (
                                <div className='coin-marketcap'>${item.marketCap}</div>
                            )}
                            <div className={`price-change ${item.priceChange >= 0 ? 'up' : 'down'}`}>
                                {item.priceChange >= 0 ? <CaretUpFilled /> : <CaretDownFilled />}
                                {Math.abs(item.priceChange)}%
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TrendingNFT;