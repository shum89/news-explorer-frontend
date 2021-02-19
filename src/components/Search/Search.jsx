import React from 'react';
import reducerForForm from '../../utils/formHelper';

const initialFormValueState = {
  inputValues: {
    search: '',
  },
  inputValidities: {
    searchValidity: true,
  },
};

function reducerForSearchForm(state, action) {
  return reducerForForm(state, action, initialFormValueState);
}

function Search({ onSearch, errorMessage }) {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSearch(formState.inputValues.search);
  };

  const [formState, dispatchForm] = React.useReducer(reducerForSearchForm, initialFormValueState);

  const handleChangeInput = (e) => {
    dispatchForm({
      type: 'DISPATCH',
      field: e.target.name,
      value: e.target,
    });
  };

  return (
    <section className="search">
      <div className="search__wrapper">
        <h2 className="search__title">Что творится в&nbsp; мире?</h2>
        <p className="search__subtitle">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
        <form className="search__form" onSubmit={handleSubmit} noValidate>
          <input className="search__input" name="search" value={formState.inputValues.search} required onChange={handleChangeInput} placeholder="Введите тему новости" />
          <span className="search__input-error">{errorMessage}</span>
          <button className="search__button" type="submit">Искать</button>
        </form>
      </div>
    </section>
  );
}

export default Search;
