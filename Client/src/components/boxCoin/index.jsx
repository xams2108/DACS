import { Col, Row } from 'antd';
import BoxCoinComponent from './BoxCoin';

function BoxCoin() { 
    const listCoin = [
        {
            name: "BTC",
            icon: "/image/iconTopCoin/btc.png",
            bgColor: "#FFF9C4"
        },
        {
            name: "ETH",
            icon: "/image/iconTopCoin/ethereum.png",
            bgColor: "#BBDEFB"
            
        },
        {
            name: "BNB",
            icon: "/image/iconTopCoin/binance.png",
            bgColor: "#C8E6C9"
        },
        {
            name: "SOl",
            icon: "/image/iconTopCoin/sol.png",
            bgColor: "#E1BEE7"
        }
    ];

    return (
        <>  
            <Row gutter={[20, 20]}>
                {
                    listCoin.map((coin) => {
                        return ( 
                            <Col key={coin} xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}>
                                <BoxCoinComponent title={coin.name}  icon={coin.icon} bgColor={coin.bgColor}/>
                            </Col>
                        );
                    })
                }
            </Row>
        </>
    );
}

export default BoxCoin;