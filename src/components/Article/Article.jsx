import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import SavedNewsContext from '../../contexts/SavedNewsContext';

const Article = ({
  article, isLoggedIn, onSaveIcon, onDeleteButton,
}) => {
  const {
    publishedAt, title, description, urlToImage, url, source,
    keyword, text, date, link, image,
  } = article;
  const location = useLocation();
  const savedNews = useContext(SavedNewsContext);
  const { pathname } = location;
  const isSaved = isLoggedIn && savedNews.some((i) => i.date === publishedAt && i.title === title);
  const bookmarkClass = isSaved ? 'article__button-icon_bookmark_saved' : '';
  const tooltipText = (pathname === '/') ? 'Войдите, чтобы сохранять статьи' : 'Убрать из сохранённых';
  const handleSaveNews = () => {
    onSaveIcon(article);
  };
  const handleDelete = () => {
    onDeleteButton(article);
  };
  const options = {
    month: 'long',
    day: 'numeric',
  };
  const dateClass = new Date(publishedAt || date);
  const dayAndMonth = dateClass.toLocaleString('ru', options);
  const fullDate = `${dayAndMonth}, ${dateClass.getFullYear()}`;
  return (
    <>
      <li>
        <article className="article">
          {pathname === '/' ? (
            <button className="article__button" onClick={handleSaveNews} type="button">
              <svg className={`article__button-icon article__button-icon_bookmark ${bookmarkClass}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.3822 15.7137L6 19.9425V4L18 4V19.9425L12.6178 15.7137L12 15.2283L11.3822 15.7137Z" strokeWidth="2" />
              </svg>
            </button>
          )
            : (
              <button className="article__button" onClick={handleDelete} type="button">
                <svg className="article__button-icon article__button-icon_trash" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 0H6V2H0V4H18V2H12V0ZM2 6V17C2 18.1046 2.89543 19 4 19H14C15.1046 19 16 18.1046 16 17V6H14V17H4V6H2ZM6 6L6 15H8L8 6H6ZM10 6V15H12V6H10Z" />
                </svg>
              </button>
            )}
          {!isLoggedIn && <span className="article__tooltip">{tooltipText}</span>}
          {pathname === '/saved-news' && <span className="article__keyword">{keyword}</span>}
          <div className="article__image-wrapper">
            <img className="article__image" src={urlToImage || image} alt={title} />
          </div>
          <div className="article__text-wrapper">
            <p className="article__date">{fullDate}</p>
            <h2 className="article__title">{title}</h2>
            <p className="article__text">
              {description || text}
            </p>
            <a className="article__source" rel="noopener noreferrer" target="_blank" href={url || link}>{pathname === '/' ? source.name : source}</a>
          </div>
        </article>
      </li>
    </>
  );
};
export default Article;
