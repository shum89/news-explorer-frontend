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
  },
  inputValidities: {
    emailValidity: true,
    passwordValidity: true,
  },
  inputErrors: {
    emailError: '',
    passwordError: '',
  },
  formValid: false,
};

function reducerForEditProfileForms(state, action) {
  /**
   * setting initial values from context
   */
  return reducerForForm(state, action, initialFormValueState);
}

const LoginPopup = ({
  isOpen, onClose, handleChangePopup, onLogin, name,
}) => {
  const [formState, dispatchForm] = React.useReducer(reducerForEditProfileForms, initialFormValueState);
  const { passwordError, emailError } = formState.inputErrors;
  const handleInput = (e) => {
    dispatchForm({
      type: 'DISPATCH',
      field: e.target.name,
      value: e.target,
    });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    onLogin();
    onClose();
  };

  return (
    <Popup isOpen={isOpen} onSubmit={handleLogin} onClose={onClose} handleChangePopup={handleChangePopup} name={name}>
      <fieldset className="popup__fieldset">
        <legend className="popup__title">Вход</legend>
        <label className="popup__label">
          Email
          <input
            className="popup__input"
            required
            type="email"
            minLength="6"
            maxLength="30"
            placeholder="Введите почту"
            name="email"
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
            placeholder="Введите пароль"
            type="password"
            name="password"
            required
            onChange={handleInput}
          />
          <span className="popup__input-error">{passwordError}</span>
        </label>
        <button type="submit" onClick={handleLogin} disabled={!formState.formValid} className="popup__button">
          Войти
        </button>
      </fieldset>
    </Popup>
  );
};
export default LoginPopup;
