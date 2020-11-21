import React, { useEffect } from 'react';
import FormValidator from '../utils/FormValidator';

function PopupWithForm({
  title,
  name,
  isOpen,
  onClose,
  onSubmit,
  children
}) {

  useEffect(() => {

    const validateOptions = {
      formSelector: '.popup__form',
      inputSelector: '.popup__input',
      submitButtonSelector: '.popup__button-save',
      inactiveButtonClass: 'popup__button-save_inactive',
      inputErrorClass: 'popup__input_type_error',
      errorClass: 'popup__input-error_active'
    };

    const popupForm = document.querySelector(`.popup_${name}`);
    const formValidator = new FormValidator(validateOptions, popupForm);
    formValidator.enableValidation();
  }, [name]);

  return (
    <div className={`popup ${isOpen ? 'popup_opened' : 'popup_closed' }  popup_${name}`}>
        <div className="popup-container popup__container">
          <form className={`popup__form popup__form-edit_${name}`} name={name} action="#" method="GET" onSubmit={onSubmit}>
            <h4 className="popup__header">{title}</h4>
            {children}
            <button className="popup__button-save" type="submit">Сохранить</button>
          </form>
          <button type="button" className="popup__button-close" onClick={onClose} />
        </div>
      </div>
  );

}

export default PopupWithForm;
