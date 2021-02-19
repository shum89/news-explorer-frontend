import React from 'react';
import Popup from '../Popup/Popup';

const Tooltip = ({
  isOpen, onClose, handleChangePopup,
}) => (
  <Popup isOpen={isOpen} name="tooltip" onClose={onClose} handleChangePopup={handleChangePopup}>
    <legend className="popup__title">Пользователь успешно зарегистрирован!</legend>
  </Popup>
);

export default Tooltip;
