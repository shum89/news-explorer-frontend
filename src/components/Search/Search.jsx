import React from 'react';

function Search() {
  return (
    <section className="search">
      <div className="search__wrapper">
        <h2 className="search__title">Что творится в&nbsp; мире?</h2>
        <p className="search__subtitle">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
        <form className="search__form">
          <input className="search__input" placeholder="Введите тему новости" />
          <button className="search__button" type="submit">Искать</button>
        </form>
      </div>
    </section>
  );
}

export default Search;
