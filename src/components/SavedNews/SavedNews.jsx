import React from 'react';
import ArticleList from '../ArticleList/ArticleList';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';

const SavedNews = () => (
  <main className="main">
    <SavedNewsHeader />
    <div className="main__news-container">
      <ArticleList />
    </div>
  </main>
);

export default SavedNews;
