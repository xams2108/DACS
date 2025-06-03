import { Dropdown, Button, Badge } from 'antd';
import { BellOutlined, InfoCircleOutlined } from '@ant-design/icons';
import './notify.scss';

function Notify() {
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
            key: 4,
            coin: "Binance Coin",
            symbol: "BNB",
            price: 586.94,
            change: -0.192,
            timestamp: "2025-04-15 11:04:00",
        },
        {
            key: 5,
            coin: "Ripple",
            symbol: "XRP",
            price: 2.15,
            change: 0.467,
            timestamp: "2025-04-15 11:04:00",
        },
        {
            key: 6,
            coin: "Bitcoin",
            symbol: "BTC",
            price: 83688,
            change: -1.23,
            timestamp: "2025-04-16 11:10:00",
        },
        {
            key: 7,
            coin: "Ethereum",
            symbol: "ETH",
            price: 1591.51,
            change: -2.86,
            timestamp: "2025-04-16 11:10:00",
        },
    ];

    const items = notifys.map((item) => ({
        key: item.key,
        label: (
            <div className="notify-item">
                <div className="notify-item__icon">
                    <InfoCircleOutlined />
                </div>
                <div className="notify-item__content">
                    <div className="notify-item__title">
                        {item.coin} ({item.symbol})
                    </div>
                    <div className="notify-item__detail">
                        <span className="notify-item__price">${item.price.toLocaleString()}</span>
                        <span className={`notify-item__change ${item.change >= 0 ? 'positive' : 'negative'}`}>
                            {item.change >= 0 ? '+' : ''}{item.change}%
                        </span>
                    </div>
                    <div className="notify-item__time">{item.timestamp}</div>
                </div>
            </div>  
        ),
    }));

    return (
        <Dropdown
            menu={{ items }}
            dropdownRender={(menu) => (
                <div className="notify-dropdown">
                    <div className="notify-dropdown__header">
                        <span>Thông Báo</span>
                        <Badge count={notifys.length} color="#00e676" />
                    </div>
                    <div className="notify-dropdown__body">
                        {menu}
                    </div>
                    <div className="notify-dropdown__footer">
                        <span>Xem tất cả thông báo</span>
                    </div>
                </div>
            )}
            trigger={['click']}
            placement="bottomRight"
        >
            <Button 
                icon={
                    <Badge count={notifys.length} size="small" color="#00e676">
                        <BellOutlined style={{ 
                            fontSize: '22px', 
                            color: '#c9d1d9', 
                        }} />
                    </Badge>
                }
                className="notify-button"
            />
        </Dropdown>
    );
}

export default Notify;