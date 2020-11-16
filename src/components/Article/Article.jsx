import React from 'react';
import { useLocation } from 'react-router-dom';

const Article = ({
  article, isLoggedIn, isSaved, onSaveIcon,
}) => {
  const location = useLocation();
  const { pathname } = location;
  const bookmarkClass = isSaved ? 'article__button-icon_bookmark_saved' : '';
  const tooltipText = (pathname === '/') ? 'Войдите, чтобы сохранять статьи' : 'Убрать из сохранённых';

  const {
    publishedAt, title, description, urlToImage, url, source,
  } = article;
  const options = {
    month: 'long',
    day: 'numeric',
  };
  const date = new Date(publishedAt);
  const dayAndMonth = date.toLocaleString('ru', options);
  const fullDate = `${dayAndMonth}, ${date.getFullYear()}`;
  return (
    <>
      <li>
        <article className="article">
          <button className="article__button" onClick={onSaveIcon} type="button">
            {pathname === '/' ? (
              <svg className={`article__button-icon article__button-icon_bookmark ${bookmarkClass}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.3822 15.7137L6 19.9425V4L18 4V19.9425L12.6178 15.7137L12 15.2283L11.3822 15.7137Z" strokeWidth="2" />
              </svg>
            ) : (
              <svg className="article__button-icon article__button-icon_trash" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 0H6V2H0V4H18V2H12V0ZM2 6V17C2 18.1046 2.89543 19 4 19H14C15.1046 19 16 18.1046 16 17V6H14V17H4V6H2ZM6 6L6 15H8L8 6H6ZM10 6V15H12V6H10Z" />
              </svg>
            )}
          </button>
          {!isLoggedIn && <span className="article__tooltip">{tooltipText}</span>}
          {pathname === '/saved-news' && <span className="article__keyword">Природа</span>}
          <div className="article__image-wrapper">
            <img className="article__image" src={urlToImage} alt={title} />
          </div>
          <div className="article__text-wrapper">
            <p className="article__date">{fullDate}</p>
            <h2 className="article__title">{title}</h2>
            <p className="article__text">
              {description}
            </p>
            <a className="article__source" rel="noopener noreferrer" target="_blank" href={url}>{source.name}</a>
          </div>
        </article>
      </li>
    </>
  );
};
export default Article;
