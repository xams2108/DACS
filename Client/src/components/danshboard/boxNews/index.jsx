import { Card, Input, Spin } from 'antd';
import { ReadOutlined } from '@ant-design/icons';
import NewsItem from './News';
import './index.scss';
import getNews from '../../../services/api/news.api';
import { useState, useEffect } from 'react';

function BoxNews() {
  const [search, setSearch] = useState('');
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNews = async (searchKeyword) => {
    setLoading(true);
    try {
      const data = await getNews(searchKeyword, 20);
      setNewsData(data?.data || []);
    } catch (err) {
      console.error('Error fetching news:', err.message);
      setNewsData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchNews = () => {
    fetchNews(search);
  };

  useEffect(() => {
    fetchNews(); // Lấy tin mặc định ban đầu
  }, []);

  return (
    <Card className="box-news">
      <div className="box-news__header">
        <h2 className="box-news__title">
          <ReadOutlined style={{ marginRight: 8 }} />
          News
        </h2>
        <div className="box-news__search">
          <Input.Search
            placeholder="Search topic..."
            allowClear
            enterButton
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onSearch={handleSearchNews}
          />
        </div>
      </div>

      <div className="box-news__body">
        {loading ? (
          <div className="box-news__loading">
            <Spin tip="Loading news..." />
          </div>
        ) : newsData?.length > 0 ? (
          newsData.map((item, index) => <NewsItem key={index} data={item} />)
        ) : (
          <p className="box-news__empty">No news to display.</p>
        )}
      </div>
    </Card>
  );
}

export default BoxNews;
