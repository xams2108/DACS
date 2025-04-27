import { Col, Row, Card} from 'antd';

function index() {
    return(
    <> 

        <Row gutter={[0,20]}>
                <Col span={24}><Card style={{ height: 40, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'} }>
                        
                </Card>
                </Col>
                <Col span={24}><Card style={{ height: 340, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    
                </Card></Col>
        </Row>

    </>
    )
}
export default index