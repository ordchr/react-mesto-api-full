import React, {useRef} from 'react';

function ImagePopup({
  card,
  onClose
}) {
    const imagePreviewContainer = useRef();
    return (
        <div className={`popup-preview ${Object.keys(card).length === 0 ? 'popup_closed' : 'popup_opened' }`}>
            <div className="popup-container popup-preview__container" ref={imagePreviewContainer}>
                <img src={card.link} className="popup-preview__image" alt=""
                    onLoad = {
                        e => {
                            imagePreviewContainer.current.style.width = `${e.target.offsetWidth}px`
                            imagePreviewContainer.current.style.height = `${e.target.offsetHeight}px`
                        }
                    }
                />
                <button type="button" className="popup__button-close" onClick={onClose} />
                <p className="popup-preview__description">{card.name}</p>
            </div>
        </div>
    );

}

export default ImagePopup;
