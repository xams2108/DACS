import { Col, Row } from 'antd';
import CartItem from '../cardItem';
function dashboard() {
  return(
    <>
        <Row gutter={[20,20]}>
            <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}>
                <CartItem title="Box 1"/>
            </Col>
            <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}>
                <CartItem title="Box 2"/>
            </Col>
            <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}>
                <CartItem title="Box 3"/>
            </Col>
            <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}>
                <CartItem title="Box 4"/>
            </Col>
        </Row>
        <Row gutter={[20,20]} className='mt-20'>
            <Col xxl={16} xl={16} lg={16} md={24} sm={24} xs={24}>
                <CartItem height={400} title="Box5"/>
            </Col>
            <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
                <CartItem height={400} title="Box6"/>
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
 
export default dashboard