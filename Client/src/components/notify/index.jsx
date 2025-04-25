import { Dropdown, Button } from 'antd';
import {BellOutlined,InfoCircleOutlined} from '@ant-design/icons';
import './notify.scss'
function notify() {
    const notifys = [
        {
            key: 2,
            coin: "Bitcoin",
            symbol: "BTC",
            price: 85330,
            change: 0.998,
            timestamp: "2025-04-15 11:04:00",
          },
          {
            key: 3,
            coin: "Ethereum",
            symbol: "ETH",
            price: 1638.18,
            change: 0.619,
            timestamp: "2025-04-15 11:04:00",
          },
          {
            coin: "Binance Coin",
            symbol: "BNB",
            price: 586.94,
            change: -0.192,
            timestamp: "2025-04-15 11:04:00",
          },
          {
            key: 4,
            coin: "Ripple",
            symbol: "XRP",
            price: 2.15,
            change: 0.467,
            timestamp: "2025-04-15 11:04:00",
          },
          {
            key: 5,
            coin: "Bitcoin",
            symbol: "BTC",
            price: 83688,
            change: -1.23,
            timestamp: "2025-04-16 11:10:00",
          },
          {
            key: 6,
            coin: "Ethereum",
            symbol: "ETH",
            price: 1591.51,
            change: -2.86,
            timestamp: "2025-04-16 11:10:00",
          },
    ];
    const items = notifys.map((item) => ({
        key: item.key,
        label: `${item.coin} (${item.symbol}) - $${item.price}`,
        icon: <InfoCircleOutlined />
      }));
    return(
        <>
            <Dropdown
                 menu={{ items }}
                 dropdownRender={(menu) =>{
                    return(
                        <>
                            <div className='notify-dropdown'>
                                <div className='notify-dropdown__header'>
                                    <span >Thông Báo</span>
                                </div>
                                <div className='notify-dropdown__body'>
                                    {menu }
                                </div>
                                <div className='notify-dropdown__footer'>
                                    <span>Xem tất cả thông báo</span>
                                </div>
                            </div>
                        </>
                    )
                    
                 }}
                trigger={['click']}
            >
            <Button icon={<BellOutlined/>}></Button>
            
            </Dropdown>
        </>
    )
}
export default notify