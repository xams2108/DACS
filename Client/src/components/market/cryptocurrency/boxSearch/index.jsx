import { Col, Row, Input } from "antd";
import Card from "../../../cardItem";
import { useEffect, useState, useCallback } from "react";
import './index.scss';
import getCoins from "../../../../services/api/getCoins.api";
import { useChartProvider } from "../../../../providers/chartProvider";
import SymbolItem from "./SymbolItem";

const { Search } = Input;

function BoxSearch() {
  const { symbol, setSymbol } = useChartProvider();
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [listCoins, setListCoin] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true);
      try {
        const coins = await getCoins(searchText);
        setListCoin(coins.data);
      } catch (error) {
        console.error("Failed to fetch coins", error);
        setListCoin([]);
      }
      setLoading(false);
    };
    fetchApi();
  }, [searchText]);

  const handleSymbol = useCallback(
    (sym) => {
      setSymbol(sym);
    },
    [setSymbol]
  );

  const handleSearch = useCallback(
    (value) => {
      setSearchText(value.trim());
    },
    []
  );

  return (
    <Row>
      <Col span={24}>
        <Search
          placeholder="Token/coin"
          allowClear
          enterButton
          size="large"
          onSearch={handleSearch}
          loading={loading}
          className="custom-search-input"
        />
      </Col>
      <Col span={24} className="mt-20">
        <Card height={470}>
          <div className="ListSymbol">
            {listCoins.map((coin) => (
              <div
                key={coin.symbol}
                className={`ListSymbol__item ${symbol === coin.symbol ? 'ListSymbol__item--active' : ''}`}
                onClick={() => handleSymbol(coin.symbol)}
              >
                <SymbolItem coin={coin} />
              </div>
            ))}
          </div>
        </Card>
      </Col>
    </Row>
  );
}

export default BoxSearch;
