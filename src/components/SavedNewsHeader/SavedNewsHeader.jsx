import React from 'react';

const SavedNewsHeader = () => (
  <section className="saved-news-header">
    <p className="saved-news-header__title">Сохранённые статьи</p>
    <h2 className="saved-news-header__lead">Грета, у вас 5 сохранённых статей</h2>
    <p className="saved-news-header__keywords-list">
      По ключевым словам:&nbsp;
      <span className="saved-news-header__keywords">Природа, Тайга и 2-м другим</span>
    </p>
  </section>
);

export default SavedNewsHeader;
