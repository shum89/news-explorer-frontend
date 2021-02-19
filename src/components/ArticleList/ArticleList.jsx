import React from 'react';
import { useLocation } from 'react-router-dom';
import Article from '../Article/Article';

const ArticleList = ({
  isLoggedIn, isSaved, onSaveIcon, news, onShowMore, isButtonShown, onDeleteButton,
}) => {
  const location = useLocation();
  return (
    <section className="articles">
      {location.pathname !== '/saved-news' && <h2 className="articles__title">Результаты поиска</h2>}
      <ul className="articles__list">
        {news.map((article, index) => (
          <Article
            article={article}
            key={index}
            isLoggedIn={isLoggedIn}
            isSaved={isSaved}
            onSaveIcon={onSaveIcon}
            onDeleteButton={onDeleteButton}
          />
        ))}
      </ul>
      {!isButtonShown && location.pathname === '/'
                && <button className="articles__button" type="button" onClick={onShowMore}>Показать еще</button>}
    </section>
  );
};

export default ArticleList;
