import React from 'react';
import { Card } from 'antd';
import './News.scss';

function News({ data }) {
  const { AUTHORS, BODY, IMAGE_URL, TITLE, URL, PUBLISHED_ON, SOURCE_DATA } = data;
  const date = new Date(PUBLISHED_ON * 1000);
  const DATE = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const SOURCE = SOURCE_DATA.NAME;

  const handleClick = () => {
    if (URL) {
      window.open(URL, '_blank');
    }
  };

  return (
    <div className="news-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <div className="news-card__image">
        <img src={IMAGE_URL} alt="Cetus News" />
      </div>
      <div className="news-card__content">
        <div className="news-card__content__title">{TITLE}</div>
        <div className="news-card__content__body">{BODY}</div>
        <div className="news-card__content__source">{SOURCE}</div>
        <div className="news-card__content__meta">
          <span className="author">{AUTHORS || 'Unknown Author'}</span>
          <span className="date"> • {DATE}</span>
        </div>
      </div>
    </div>
  );
}

export default News;
