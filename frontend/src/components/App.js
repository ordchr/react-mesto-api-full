import React from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Register from './Register';
import Login from './Login';
import { Route, Switch } from 'react-router-dom';
import { useHistory } from "react-router";
import auth from '../utils/Auth';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({});

  const history = useHistory();

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isInfoTooltipSuccess, setIsInfoTooltipSuccess] = React.useState(false);
  const [email, setEmail] = React.useState('');


  React.useEffect(() => {
    api.getUserInfo()
      .then(userInfo => {
        setCurrentUser(userInfo);
        console.log('get user info');
      })

    tokenCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([
      api.getInitialCards(),
    ])
    .then(([initialCards]) => {
      setCards(initialCards)
    })
    .catch((err) => {
      // попадаем сюда если один из промисов завершится ошибкой
      console.log(err);
    })

  }, []);

  const handleCardLike = (card) => {
    const isLiked = card.likes.some( i => i._id === currentUser._id);
    api.changeLikeStatus(card._id, !isLiked)
      .then(newCard => {
        const newCards = cards.map(c => c._id === card._id ? newCard : c)
        setCards(newCards);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
      .then(_ => {
        const newCards = cards.filter(c => c._id !== card._id)
        setCards(newCards);
      })
      .catch(err => {
        console.log(err);
      })
  }


  function handleEditAvatarClick() {
    setisEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setisAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setisEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setisAddPlacePopupOpen(false);
    setSelectedCard({});
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(userInfo) {
    console.log(userInfo);
    api.updateUserInfo(userInfo)
      .then(userInfo => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleUpdateAvatar({avatarLink}) {
    api.updateAvatar({avatar: avatarLink})
      .then(userInfo => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit (newCard) {
    api.addCard(newCard)
      .then(newCard => {
        console.log(newCard);
        setCards([...cards, newCard]);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleSignUp(authData) {

    auth.register(authData)
      .then( _ => {
        setIsInfoTooltipSuccess(true);
        setIsInfoTooltipOpen(true);
        history.push('/sign-in');
      })
      .catch( err => {
        console.log(`Ошибка запроса к API. Код ошибки: ${err.status}`);
        if ( err.status === 400 ) {
          console.log('Не корректно заполнено одно из полей');
        }
        setIsInfoTooltipSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  }

  function handleSignIn(authData) {
    console.log(authData);
    auth.login(authData)
      .then((resLogin) => {
        setLoggedIn(true);
        localStorage.setItem('jwt', resLogin["token"]);
        setEmail(authData["email"]);
        history.push('/');
      })
      .catch( err => {
        console.log(`Ошибка запроса к API. Код ошибки: ${err.status}`);
        if (err.status === 400) {
          console.log('Не передано одно из полей ');
        } else if (err.status === 401) {
          console.log('Пользователь с email не найден');
        }
        setIsInfoTooltipSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  }

  function tokenCheck () {
    if (localStorage.getItem('jwt')){
      const jwt = localStorage.getItem('jwt');
      auth.validateToken(jwt)
        .then(res => {
          setLoggedIn(true);
          setEmail(res["data"]["email"]);
          history.push('/');
        })
        .catch(err => {
          console.log(`Ошибка запроса к API. Код ошибки: ${err.status}`);
          if (err.status === 401) {
            console.log('Токен не передан или передан не в том формате. Переданный токен не корректен');
          }
        });
    }
  }

  function onSignOut () {
    setLoggedIn(false);
    setEmail('');
    localStorage.removeItem('jwt');
    history.push('/sign-in');
  }


  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header onSignOut={onSignOut} isLoggedIn={loggedIn} email={email}/>
        <Switch>
          <Route path="/sign-up">
            <Register onSignUp={handleSignUp}/>
          </Route>
          <Route path="/sign-in">
            <Login onSignIn={handleSignIn}/>
          </Route>
          <ProtectedRoute path="/" component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
            loggedIn={loggedIn}
          />
        </Switch>
        <Footer />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          isSuccess={isInfoTooltipSuccess}
          onCloseHangle={() => {
            console.log('in close Hangle');
            setIsInfoTooltipOpen(false);
          }}
        />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <div className="popup popup_closed popup_confirm">
          <div className="popup-container popup__container">
            <form className="popup__form popup__form-confirm" name="confirm" action="#" method="POST">
              <h4 className="popup__header popup__header_confirm">Вы уверены?</h4>
              <button className="popup__button-yes" type="submit">Да</button>
            </form>
            <button type="button" className="popup__button-close" />
          </div>
        </div>

      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
