import { Col, Row } from 'antd';
import CartItem from '../../components/cardItem';
import TopCoin from './topcoin'
import Trending from './trending'
import News from './news'
function Dashboard() {

   
  return(
    <>  
        
        <TopCoin/>
        <Row gutter={[20,20]} className='mt-20'>
            <Col xxl={16} xl={16} lg={16} md={24} sm={24} xs={24}>
                <Trending/>
            </Col>
            <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
                <News/>
            </Col>
        </Row>
        <Row gutter={[20,20]} className='mt-20'>
            
            <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
                <CartItem height={400} title="Box7"/>
            </Col>
            <Col xxl={16} xl={16} lg={16} md={24} sm={24} xs={24}>
                <CartItem height={400} title="Box8"/>
            </Col>
        </Row>
    </>
  )
}
export default Dashboard