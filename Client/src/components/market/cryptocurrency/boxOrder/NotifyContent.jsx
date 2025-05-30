import { useEffect, useState } from 'react';
import { InputNumber, Button } from 'antd';
import { useChartProvider } from '../../../../providers/chartProvider';
import getCoins from '../../../../services/api/getCoins.api';
import getPrice from '../../../../services/api/getPrice.api';
import Service from '../../../../services/api/order.api';
import { useNotification } from '../../../../providers/Notification';
import './NotifyContent.scss';
import ModalConfirm from '../../../modal/confirm';

function NotifyContent() {
  const { symbol } = useChartProvider();
  const [coin, setCoin] = useState(null);
  const [price, setPrice] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const notification = useNotification();
  useEffect(() => {
    const fetchCoins = async () => {
      if (!symbol) return;

      try {
        const coins = await getCoins(symbol);
        const price = await getPrice(symbol);
        setPrice(price.data.price);
        setCoin(coins.data[0]);
      } catch (error) {
        console.error('Error fetching coins:', error);
      }
    };

    fetchCoins();
  }, [symbol]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const confimModal = async()  => {
    const data = {
      symbol: coin.symbol,
      price: price,
      type: "notify",
    }
    const res = await Service.postNoti(data);
    if(res.success){
      notification.success({ description: res.message })
    }else{
      notification.error({ description: "Order notification failed" })
    }
    setIsOpen(false)
  }
  return (
    <>
      <ModalConfirm 
        isOpen={isOpen} 
        onClose={closeModal} 
        title="Confrim Notification" 
        message={`Get notification ${symbol} at price ${price}`}
        onConfirm={confimModal}
      />
      <div className="NotifyContent">
        <div className="NotifyContent__Title">
          <div className="NotifyContent__Title__Icon">
            <img src={coin?.icon} alt={coin?.symbol} />
          </div>
          <div className="NotifyContent__Title__Symbol">{coin?.symbol}</div>
        </div>

        <div className="NotifyContent__Input">
          <div className="NotifyContent__Input__Label">
            <span>Price</span>
          </div>
          <div className="NotifyContent__Input__Value">
            <InputNumber
              value={price}
              onChange={(value) => setPrice(value)}
              formatter={(value) => {
                if (value === null || value === undefined) return '';
                const [intPart, decimalPart] = String(value).split('.');
                const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                return decimalPart !== undefined
                  ? `${formattedInt}.${decimalPart} USDT`
                  : `${formattedInt} USDT`;
              }}
              parser={(value) =>
                value?.replace(/\s?USDT/g, '').replace(/,/g, '') || ''
              }
              min={0}
              step={1}
              precision={2}
              className="NotifyContent__Input__Value__Input"
            />
          </div>
        </div>

        <div className="NotifyContent__Submit">
          <Button
            loading={isOpen}
            type="primary"
            className="NotifyContent__Submit__Button"
            onClick={openModal}
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  );
}

export default NotifyContent;
