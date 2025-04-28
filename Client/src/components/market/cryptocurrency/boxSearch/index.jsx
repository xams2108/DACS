import { Col, Row, Input, List, Typography } from "antd";
import Card from "../../../cardItem";
import { useEffect, useState } from "react";
import './index.scss';
import getCoins from "../../../../services/api/getCoins.api";

const { Search } = Input;
const { Text } = Typography;

function BoxSearch() {
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(false);
    const [listCoins, setListCoin] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);
            const coins = await getCoins(searchText); 
            setListCoin(coins.data);
            setLoading(false);
        };
        fetchApi(); 
    }, [searchText]);

    const handleSearch = (value) => {
        setSearchText(value);
    };

    return (
        <>
            <Row>
                <Col span={24}>
                <Search
                    placeholder="Token/coin"
                    allowClear
                    enterButton
                    size="large"
                    onPressEnter={handleSearch}
                    onSearch={handleSearch}
                    loading={loading}
                    className="custom-search-input"
                     
                />
                </Col>
                
                <Col span={24} className="mt-20">
                    <Card height={470}>
                        <div className="ListSymbol">
                            {listCoins.map((coin) => (
                                <div className="ListSymbol__item" key={coin.symbol}>
                                    <span>{coin.baseAsset}/{coin.quoteAsset}</span>
                                </div>
                            ))}
                        </div>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default BoxSearch;