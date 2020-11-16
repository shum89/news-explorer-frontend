import React from 'react';
import Popup from '../Popup/Popup';
import reducerForForm from '../../utils/formHelper';
/**
 * initial state of form elements
 * @type {{inputValidities: {nameValidity: boolean, aboutValidity: boolean}, inputErrors: {nameError: string, aboutError: string}, formValid: boolean, inputValues: {name: string, about: string}}}
 */
const initialFormValueState = {
  inputValues: {
    email: '',
    password: '',
    name: '',
  },
  inputValidities: {
    emailValidity: true,
    passwordValidity: true,
    nameValidity: true,
  },
  inputErrors: {
    emailError: '',
    passwordError: '',
    nameError: '',
  },
  formValid: false,
};

function reducerForEditProfileForms(state, action) {
  /**
   * setting initial values from context
   */
  return reducerForForm(state, action, initialFormValueState);
}

const AuthPopup = ({
  isOpen, onClose, handleChangePopup, onAuth, name,
}) => {
  const [formState, dispatchForm] = React.useReducer(reducerForEditProfileForms, initialFormValueState);
  const { nameError, emailError, passwordError } = formState.inputErrors;
  const handleInput = (e) => {
    dispatchForm({
      type: 'DISPATCH',
      field: e.target.name,
      value: e.target,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAuth();
  };

  return (
    <Popup isOpen={isOpen} onSubmit={handleSubmit} onClose={onClose} handleChangePopup={handleChangePopup} name={name}>
      <fieldset className="popup__fieldset">
        <legend className="popup__title">Регистрация</legend>
        <label className="popup__label">
          Email
          <input
            className="popup__input"
            name="email"
            type="email"
            minLength="6"
            maxLength="30"
            placeholder="Введите почту"
            onChange={handleInput}
          />
          <span className="popup__input-error">{emailError}</span>
        </label>
        <label className="popup__label">
          Password
          <input
            className="popup__input"
            minLength="8"
            autoComplete="password"
            maxLength="30"
            type="password"
            name="password"
            placeholder="Введите пароль"
            onChange={handleInput}
            required
          />
          <span className="popup__input-error">{ passwordError }</span>
        </label>
        <label className="popup__label">
          Имя
          <input
            className="popup__input"
            minLength="2"
            maxLength="30"
            type="text"
            name="name"
            placeholder="Введите имя"
            onChange={handleInput}
            required
          />
          <span className="popup__input-error">{ nameError }</span>
        </label>
        <button type="submit" className="popup__button" disabled={!formState.formValid}>
          Авторизоваться
        </button>
      </fieldset>
    </Popup>
  );
};
export default AuthPopup;
