import './Header.scss';
import { useChartProvider } from '../../../../providers/chartProvider';
import usePriceCoin from '../../../../hooks/usePriceCoin';
import { useState, useEffect } from 'react';
import { Typography, Tag, Space } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const { Text } = Typography;

function Header() {
  const { symbol, interval, setInterval } = useChartProvider();
  const listInterval = ['1m', '5m', '15m', '30m', '1h', '4h', '1d', '1w', '1M', '3M', '1y'];

  const { data: Coindata } = usePriceCoin(symbol, 'ticker');

  const [price, setPrice] = useState(null);
  const [prevPrice, setPrevPrice] = useState(null);
  const [vol, setVol] = useState(null);
  const [percentChange, setPercentChange] = useState(null);
  
  useEffect(() => {
    if (Coindata?.data) {
      const { c, v, P } = Coindata.data;
      const newPrice = parseFloat(c);

      if (price !== null && newPrice !== price) {
        setPrevPrice(price);
      }

      setPrice(newPrice);
      setVol(parseFloat(v));
      setPercentChange(parseFloat(P));
    }
  }, [Coindata]);

  const handleInterval = (item) => setInterval(item);

  const isUp = prevPrice !== null ? price > prevPrice : percentChange >= 0;

  return (
    <div className="chart-header">
      <div className="chart-header__left">
        <div className="chart-header__info">
          <Text className="symbol">{symbol}</Text>
          {price !== null && (
            <Text className={`price ${isUp ? 'up' : 'down'}`}>
              {price.toFixed(2)}
              <Tag className={`change-tag ${percentChange >= 0 ? 'up' : 'down'}`}>
                {percentChange >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                {Math.abs(percentChange).toFixed(2)}%
              </Tag>
            </Text>
          )}
        </div>
        <Text type="secondary" className="vol">Vol: {vol?.toLocaleString() ?? '....'}</Text>
      </div>

      <div className="chart-header__right">
        <Space size={[8, 8]} wrap>
          {listInterval.map((item) => (
            <Tag
              key={item}
              color={interval === item ? 'blue' : 'default'}
              className="interval-tag"
              onClick={() => handleInterval(item)}
            >
              {item}
            </Tag>
          ))}
        </Space>
      </div>
    </div>
  );
}

export default Header;
