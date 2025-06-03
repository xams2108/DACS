import { Col, Row } from 'antd';
import BoxCoinComponent from './BoxCoin';

function BoxCoin() {
  const listCoin = ['BTC', 'ETH', 'BNB', 'SOL'];

  return (
    <Row gutter={[20, 20]}>
      {listCoin.map((coin) => (
        <Col key={coin} xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}>
          <BoxCoinComponent symbol={coin} />
        </Col>
      ))}
    </Row>
  );
}

export default BoxCoin;
