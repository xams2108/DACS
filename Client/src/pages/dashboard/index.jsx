import { Col, Row } from 'antd';
import BoxCoin from "../../components/danshboard/boxCoin"
import BoxTrending from '../../components/danshboard/boxTrending'
import BoxNews from "../../components/danshboard/boxNews"
function Dashboard() {
  return(
    <>  
        <BoxCoin/>
        <Row gutter={[20,20]} className='mt-20'>
            <Col span={24}>
                <BoxTrending/>
            </Col>
            <Col span={24}>
                <BoxNews/>
            </Col>
        </Row>

    </>
  )
}
export default Dashboard