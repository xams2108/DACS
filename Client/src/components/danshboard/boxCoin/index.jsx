import { Col, Row } from 'antd';
import BoxCoinComponent from './BoxCoin';

function BoxCoin() { 
    const listCoin = [
        {
            name: "BTC",
            icon: "/image/iconTopCoin/btc.png",
        },
        {
            name: "ETH",
            icon: "/image/iconTopCoin/ethereum.png",
            
        },
        {
            name: "BNB",
            icon: "/image/iconTopCoin/binance.png",
        },
        {
            name: "SOl",
            icon: "/image/iconTopCoin/sol.png",

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