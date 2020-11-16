import React from 'react';
import Popup from '../Popup/Popup';

const Tooltip = ({
  isOpen, onClose, onLogin,
}) => (
  <Popup isOpen={isOpen} name="tooltip" onClose={onClose} handleChangePopup={onLogin}>
    <legend className="popup__title">Пользователь успешно зарегистрирован!</legend>
  </Popup>
);

export default Tooltip;
