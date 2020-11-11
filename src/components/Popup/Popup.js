import React from 'react';

/**
 * popup with form component
 * @property {Object} props
 * @property {string} name - name for a popup class type
 * @property {string} title - title for a popup
 * @property {function} onClose - handler for closing popup
 * @property {Boolean} isOpen - popup state
 */
function Popup({
  children, name, title,
  onClose, isOpen, onSubmit,
  handleChangePopup,
}) {
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : null}`}>
      <form className={`popup__form popup__form_type_${name}`} name={name} onSubmit={onSubmit}>
        {children}
        <button className="popup__button-close" onClick={onClose} type="button" />
        <span className="popup__subtitle">
          {name === 'tooltip' ? '' : 'или'}
          <span className="popup__link" onClick={handleChangePopup}>{name !== 'login' ? ' Войти' : ' Зарегистрироваться' }</span>
        </span>
      </form>
      <div className="popup__overlay" onClick={onClose} />
    </div>
  );
}

export default Popup;
