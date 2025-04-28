import CartItem  from "../../../components/cardItem";
import { Col, Row,Flex} from 'antd';
import BoxSearch from "../../../components/market/cryptocurrency/boxSearch";
function Cryptocurrency () {
    return(
        <>
            <Row gutter={[25,30]} className='mt-20'>
                        <Col xxl={5} xl={5} lg={5} md={24} sm={24} xs={24}>
                            <BoxSearch />
                        </Col>
                        <Col xxl={14} xl={14} lg={14} md={24} sm={24} xs={24} >
                            <CartItem height={550}/>
                        </Col>
                        <Col xxl={5} xl={5} lg={5} md={24} sm={24} xs={24}>
                            <Flex vertical={true}>
                                <Col style={{ marginBottom: '30px' }} >
                                    <CartItem height={70}/>
                                </Col>
                                <Col >
                                    <CartItem height={350}/>
                                </Col>
                            </Flex>
                        </Col>
                </Row>
                <Row>
                    <Col span={24} className='mt-20'>
                        <CartItem height={200}/>
                    </Col>
                </Row>
        </>
    )
}
export default Cryptocurrency