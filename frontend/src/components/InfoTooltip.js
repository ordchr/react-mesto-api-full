import React from 'react';

function InfoTooltip({
  isOpen,
  isSuccess,
  onCloseHangle
}) {

  return (
    <div className={`info-tooltip ${isOpen ? 'info-tooltip_opened' : 'info-tooltip_closed' }`}>
      <div className="info-tooltip__container">
        <div className={`
            info-tooltip__picture 
            ${isSuccess ? 'info-tooltip__picture_success' : 'info-tooltip__picture_failed' }`
          }>
        </div>
        <h4 className="info-tooltip__message">{`${ isSuccess 
          ? 
            'Вы успешно \n зарегистрировались!' 
            : 
              'Что-то пошло не так! \n Попробуйте ещё раз.'}`}</h4>
        <button type="button" className="info-tooltip__button-close" onClick={onCloseHangle} />
      </div>
    </div>
  );

}

export default InfoTooltip;
