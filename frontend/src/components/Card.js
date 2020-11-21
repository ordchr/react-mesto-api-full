import React from 'react';
import delIcon from '../images/del-icon.svg';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDelete}) {

  const currentUser = React.useContext(CurrentUserContext);

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  const {name, link, likes} = card;

  const isOwn = card.owner._id === currentUser._id;

  const cardDeleteButtonClassName = (
    `place__image-del ${isOwn ? '' : 'place__image-del_hidden'}`
  );

  const isLiked = card.likes.some( i => i._id === currentUser._id);
  const cardLikeButtonClassName = `place__title-like ${isLiked ? 'place__title-like_selected' : ''}`;

  return (
    <div className="place">
      <img src={link} className="place__image" alt="" onClick={handleCardClick} />
      <button type="button" className={cardDeleteButtonClassName} style={{ backgroundImage: `url(${delIcon})` }} onClick={handleCardDelete} />
      <div className="place__title">
        <h3 className="place__title-text">{name}</h3>
        <div className="place__title-like-block">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}/>
            <h5 className="place__title-like-count">{likes.length}</h5>
        </div>
      </div>
    </div>

  );

}

export default Card;
