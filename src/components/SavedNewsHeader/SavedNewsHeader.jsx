import React from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import SavedNewsContext from '../../contexts/SavedNewsContext';
import { declOfNum } from '../../utils/utils';

const SavedNewsHeader = () => {
  const user = React.useContext(CurrentUserContext);
  const savedNews = React.useContext(SavedNewsContext);
  const keywordMap = savedNews.map((article) => article = article.keyword)
    .reduce((acc, current) => {
      acc[current] = (acc[current] || 0) + 1;
      return acc;
    }, {});
  const sortedKeywords = Object.keys(keywordMap).sort((a, b) => keywordMap[b] - keywordMap[a]);

  const count = savedNews.length === 0 ? 'нет' : savedNews.length;
  const articleName = declOfNum(savedNews.length, ['статья', 'статьи', 'статей']);
  const savedName = declOfNum(savedNews.length, ['сохраненная', 'сохраненных', 'сохраненных']);
  const otherTags = sortedKeywords.slice(3).length === 0 ? '' : declOfNum(sortedKeywords.slice(3).length, ['другому', 'другим', 'другим']);
  const keywordsTop = sortedKeywords.slice(0, 3).join(', ');
  const keywordCount = sortedKeywords.length <= 3 ? keywordsTop : `${keywordsTop} и ${sortedKeywords.slice(3).length}`;
  const keywordPostfix = sortedKeywords.slice(3).length > 4 || sortedKeywords.slice(3).length < 2 ? '' : '-м';
  return (
    <section className="saved-news-header">
      <p className="saved-news-header__title">Сохранённые статьи</p>
      <h2 className="saved-news-header__lead">{`${user.name} у вас ${count} ${savedName} ${articleName}`}</h2>
      {savedNews.length !== 0 && (
        <p className="saved-news-header__keywords-list">
          По ключевым словам:&nbsp;
          <span className="saved-news-header__keywords">{`${keywordCount}${keywordPostfix} ${otherTags}`}</span>
        </p>
      )}
    </section>
  );
};

export default SavedNewsHeader;
