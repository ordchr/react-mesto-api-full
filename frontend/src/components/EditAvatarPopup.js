import React, {useRef} from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup ({isOpen, onClose, onUpdateAvatar}) {

  const avatarRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateAvatar({
      avatarLink: avatarRef.current.value
    });
  }

  return (
        <PopupWithForm title="Обновить аватар" name="update-avatar" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
          <input id="popup-input-avatar-image-link" className="popup__input popup__input_update-avatar-link"
            name="popup__input_update-avatar-link" type="url"
            placeholder="Ссылка на аватар" required ref={avatarRef}
          />
          <span id="popup-input-avatar-image-link-error" className="popup__input-error" />
        </PopupWithForm>
  );
}


export default EditAvatarPopup;
