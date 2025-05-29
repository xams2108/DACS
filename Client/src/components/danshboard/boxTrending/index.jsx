import './index.scss'
import { Col, Row } from 'antd';
import Trending from './TrendingBox';
import dataTrending from '../../../services/api/cointrending.api'
import { useEffect, useState } from 'react';
function BoxTrending(){
    const [data, setdata] = useState([])
    useEffect(() =>{
        async function fetchApi() {
            try {
                const data = await dataTrending(); 
                setdata(data);
            } catch (error) {
                console.error("Error fetching data:", error); 
            }
        }
        fetchApi()
        
    },[])
    return (
        <>
            <div className='Box'>
                <Row gutter={[20,40]}>
                    <Col span={12}>
                        <Trending title="🚀Top Trending NFT"data={data.nfts}/>
                    </Col>
                    <Col span={12}>
                        <Trending title="🔥Top Trending Coin🔥" data={data.coins}/>
                    </Col>
                </Row>
 
            </div>
        </>
    )
}
export default BoxTrending