import React from 'react';
import Popup from '../Popup/Popup';
import reducerForForm from '../../utils/formHelper';
/**
 * initial state of form elements
 * @type {{inputValidities: {nameValidity: boolean, aboutValidity: boolean}, inputErrors: {nameError: string, aboutError: string}, formValid: boolean, inputValues: {formName: string, about: string}}}
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

function reducerForFormAuth(state, action) {
  return reducerForForm(state, action, initialFormValueState);
}

const AuthPopup = ({
  isOpen, onClose, handleChangePopup, onAuth, formName, popupError,
}) => {
  const [formState, dispatchForm] = React.useReducer(reducerForFormAuth, initialFormValueState);
  const { nameError, emailError, passwordError } = formState.inputErrors;
  const { name, password, email } = formState.inputValues;
  const handleInput = (e) => {
    dispatchForm({
      type: 'DISPATCH',
      field: e.target.name,
      value: e.target,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAuth(name, password, email);
    dispatchForm({
      type: 'RESET',
    });
  };
  React.useEffect(() => {
    /**
     * reseting form with a certain action type
     */
    dispatchForm({
      type: 'RESET',
    });
  }, [isOpen]);

  return (
    <Popup isOpen={isOpen} popupError={popupError} onSubmit={handleSubmit} onClose={onClose} handleChangePopup={handleChangePopup} name={formName}>
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
            value={email}
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
            value={password}
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
            value={name}
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
