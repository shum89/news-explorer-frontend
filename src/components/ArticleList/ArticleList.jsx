import React from 'react';
import Article from '../Article/Article';
import news from '../../utils/news.json';

const ArticleList = ({ isLoggedIn, isSaved, onSaveIcon }) => (
  <section className="articles">
    {isLoggedIn && <h2 className="articles__title">Результаты поиска</h2>}
    <ul className="articles__list">
      {news.articles.map((article, index) => (
        <Article
          article={article}
          key={index}
          isLoggedIn={isLoggedIn}
          isSaved={isSaved}
          onSaveIcon={onSaveIcon}
        />
      ))}
    </ul>
    <button className="articles__button" type="button">Показать еще</button>
  </section>
);

export default ArticleList;
