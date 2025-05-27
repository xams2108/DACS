import CartItem  from "../../../components/cardItem";
import { Col, Row,Flex} from 'antd';
import BoxSearch from "../../../components/market/cryptocurrency/boxSearch";
import BoxChart from "../../../components/market/cryptocurrency/boxChart";
import BoxOrder from "../../../components/market/cryptocurrency/boxOrder";
import { ChartProvider } from "../../../providers/chartProvider";

function Cryptocurrency () {
    return(
        <>
            <ChartProvider>
                <Row gutter={[25,30]} className='mt-20'>
                            <Col xxl={4} xl={4} lg={4} md={24} sm={24} xs={24}>
                                <BoxSearch />
                            </Col>
                            <Col xxl={15} xl={15} lg={15} md={24} sm={24} xs={24} >
                            <CartItem height={500}> 
                                    <BoxChart />
                            </CartItem>
                            </Col>
                            <Col xxl={5} xl={5} lg={5} md={24} sm={24} xs={24}>
                                <BoxOrder />
                            </Col>
                    </Row>
                    <Row>
                        <Col span={24} className='mt-40'>
                            <CartItem height={200}/>
                        </Col>
                </Row>
            </ChartProvider>
        </>
    )
}
export default Cryptocurrency