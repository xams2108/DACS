
import './Header.scss';
import { useChartProvider } from '../../../../providers/chartProvider';

function Header() {
  const {symbol,interval,setInterval } = useChartProvider();
  const listInterval = [
    '1m',   // 1 phút
    '5m',   // 5 phút
    '15m',  // 15 phút
    '30m',  // 30 phút
    '1h',   // 1 giờ
    '4h',   // 4 giờ
    '1d',   // 1 ngày
    '1w',   // 1 tuần
    '1M',   // 1 tháng (30 ngày)
    '3M',   // 3 tháng (Quý)
    '1y'    // 1 năm
];

  const handleInterval = (item) => {
    setInterval(item);
  };

  return (
    <div className="chart-header">
      <div className="chart-header__left">
        <div className="chart-header__left__title">{symbol}</div>
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