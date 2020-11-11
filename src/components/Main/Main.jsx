import React from 'react';
import news from '../../utils/news.json';
import About from '../About/About';
import ArticleList from '../ArticleList/ArticleList';
import Search from '../Search/Search';
import Preloader from '../Preloader/Preloader';

function Main({
  isLoggedIn, isSaved, onSaveIcon, isLoading,
}) {
  return (
    <main className="main">
      <Search />
      <div className="main__news-container">
        {isLoading && <Preloader />}
        {news.articles.length
          ? (<ArticleList isLoggedIn={isLoggedIn} isSaved={isSaved} onSaveIcon={onSaveIcon} />)
          : (
            <div className="main__not-found">
              <span className="main__not-found-icon" />
              <h3 className="main__not-found-heading">Ничего не найдено</h3>
              <p className="main__not-found-text">К сожалению по вашему запросу ничего не найдено.</p>
            </div>
          )}
      </div>
      <About />
    </main>
  );
}

export default Main;
