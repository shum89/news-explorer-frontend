import React from 'react';
import ArticleList from '../ArticleList/ArticleList';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import SavedNewsContext from '../../contexts/SavedNewsContext';

const SavedNews = ({ onDeleteButton }) => {
  const news = React.useContext(SavedNewsContext);
  return (
    <main className="main">
      <SavedNewsHeader />
      {news.length && (
      <div className="main__news-container">
        <ArticleList news={news} onDeleteButton={onDeleteButton} />
      </div>
      )}
    </main>
  );
};

export default SavedNews;
