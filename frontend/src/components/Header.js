import React from 'react';
import { Link, Route } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header({onSignOut, isLoggedIn, email}) {
  return (
    <header className="page__section header">
      <img src={logo} className="header__logo" alt="Логотип Mesto Russia" />
      <div className="header__panel">
        <Route path="/sign-in">
          <Link to="/sign-up" className="header__panel-elem link">Регистрация</Link>
        </Route>
        <Route path="/sign-up">
          <Link to="/sign-in" className="header__panel-elem link">Войти</Link>
        </Route>
        { email && <h5 className="header__panel-elem">{email}</h5>}
        { isLoggedIn && <h5 className="header__sign-out" onClick={onSignOut}>Выйти</h5> }
      </div>
    </header>
  );

}

export default Header;
