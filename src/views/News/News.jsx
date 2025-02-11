// src/components/News.js
import React, { useState } from "react";
import axios from "axios";
import moment from "moment";
import './News.css';

const News = () => {
  const [query, setQuery] = useState("apple");
  const [days, setDays] = useState(1);
  const [news, setNews] = useState([]);

  const fetchNews = async () => {
    try {
      const response = await axios.get(`https://khadde.pythonanywhere.com/news`, {
        params: { query, days }
      });
      setNews(response.data);
    } catch (error) {
      console.error("Error fetching the news", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchNews();
  };

  return (
    <div className="news-app">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for news..."
        />
        <select value={days} onChange={(e) => setDays(e.target.value)}>
          <option value="1">Last 1 day</option>
          <option value="3">Last 3 days</option>
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
        </select>
        <button type="submit">Search</button>
      </form>

      <div className="news-list">
        {news.length > 0 ? (
          news.map((article, index) => (
            <div key={index} className="news-item">
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
            </div>
          ))
        ) : (
          <p>No news articles found</p>
        )}
      </div>
    </div>
  );
};

export default News;
