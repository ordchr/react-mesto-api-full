import React, { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup ({isOpen, onClose, onAddPlace}) {

  const newPlaceName = useRef();
  const newPlaceLink = useRef();

  useEffect(() => {
    if (!isOpen) {
      newPlaceName.current.value = '';
      newPlaceLink.current.value = '';
    }
  }, [isOpen])

  function handleSubmit (e) {
    e.preventDefault();

    onAddPlace({
      name: newPlaceName.current.value,
      link: newPlaceLink.current.value
    });

  }

  return (
        <PopupWithForm 
          title="Новое место" 
          name="add-card" 
          isOpen={isOpen} 
          onClose={onClose} 
          onSubmit={handleSubmit}
        >
          <input id="popup-input-place-name" className="popup__input popup__input_place-name"
            name="popup__input_place-name" type="text" placeholder="Название"
            minLength="1" maxLength="30" required ref={newPlaceName}
          />
          <span id="popup-input-place-name-error" className="popup__input-error" />
          <input id="popup-input-place-image-link" className="popup__input popup__input_place-image-link"
            name="popup__input_place-image-link" type="url"
            placeholder="Ссылка на картинку" required ref={newPlaceLink}
          />
          <span id="popup-input-place-image-link-error" className="popup__input-error" />
        </PopupWithForm>
  )

}

export default AddPlacePopup;
