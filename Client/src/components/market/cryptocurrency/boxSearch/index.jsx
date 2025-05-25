import { Col, Row, Input, List, Typography } from "antd";
import Card from "../../../cardItem";
import { useEffect, useState } from "react";
import './index.scss';
import getCoins from "../../../../services/api/getCoins.api";
import { useChartProvider } from "../../../../providers/chartProvider";
import SymbolItem from "./symbolItem";
const { Search } = Input;
const { Text } = Typography;

function BoxSearch() {
    
    const { symbol, setSymbol} = useChartProvider();
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
   
    function handleSymbol(symbol) {
        setSymbol(symbol);
    }
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
                    onPressEnter={(e) => handleSearch(e.target.value)}
                    onSearch={handleSearch}
                    loading={loading}
                    className="custom-search-input"
                     
                />
                </Col>
                
                <Col span={24} className="mt-20">
                    <Card height={470}>
                        <div className="ListSymbol">
                            {listCoins.map((coin) => (
                                <div className={'ListSymbol__item' + (symbol === coin.symbol ? '--active' : '')} key={coin.symbol} onClick={() => handleSymbol(coin.symbol)}>
                                    <SymbolItem coin={coin} />
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