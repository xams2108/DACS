import { useEffect, useState } from 'react';
import { useChartProvider } from '../../../../providers/chartProvider';
import getCoins from '../../../../services/api/getCoins.api';
import './NotifyContent.scss';
function NotifyContent() {
  const { symbol } = useChartProvider();
const [coin, setCoin] = useState(null); // ✅ Đúng
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await getCoins(symbol); 
        setCoin(res.data[0]); 

      } catch (error) {
        console.error('Error fetching coins:', error);
      }
    };
    fetchCoins();
  }, [symbol]);
  return (
    <>
      <div className="NotifyContent">
        <div className="NotifyContent__Title">
          <div className="NotifyContent__Title__Icon">
            <img src={coin?.icon} alt={coin?.symbol} />
          </div>
          <div className="NotifyContent__Title__Symbol">
            {coin?.symbol}
          </div>
        </div>
        <div className="NotifyContent__Input">

        </div>
      </div>
    </>
  );
}

export default NotifyContent;
