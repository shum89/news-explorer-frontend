import React from 'react';
import About from '../About/About';
import ArticleList from '../ArticleList/ArticleList';
import Search from '../Search/Search';
import Preloader from '../Preloader/Preloader';

function Main({
  isLoggedIn, isSaved, onDeleteButton, onSaveIcon, isLoading, onSearch, errorMessage, onShowMore, searchStatus, row, news, searchError,
}) {
  const newsToRender = news.slice(0, ((row + 1) * 3));
  const hideButton = newsToRender.length === news.length;
  return (
    <main className="main">
      <Search onSearch={onSearch} errorMessage={errorMessage} />
      <div className="main__news-container">
        {isLoading && <Preloader /> }
        {searchStatus && (
        <>
          { newsToRender.length
            ? (
              <ArticleList
                isButtonShown={hideButton}
                onShowMore={onShowMore}
                news={newsToRender}
                isLoggedIn={isLoggedIn}
                isSaved={isSaved}
                onDeleteButton={onDeleteButton}
                onSaveIcon={onSaveIcon}
              />
            )
            : (
              <div className="main__not-found">
                <span className="main__not-found-icon" />
                <h3 className="main__not-found-heading">Ничего не найдено</h3>
                <p className="main__not-found-text">К сожалению по вашему запросу ничего не найдено.</p>
              </div>
            )}
        </>
        )}
        {
            searchError && (
              <div className="main__news-container">
                <div className="main__not-found">
                  <h3 className="main__not-found-heading">Во время запроса произошла ошибка.</h3>
                  <p className="main__not-found-text">
                    Возможно, проблема с соединением или сервер недоступен.
                    Подождите немного и попробуйте ещё раз
                  </p>
                </div>
              </div>
            )
          }
      </div>

      <About />
    </main>
  );
}

export default Main;
