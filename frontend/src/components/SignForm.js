import React from 'react';
import { Link } from 'react-router-dom';


function SignForm({
  title,
  name,
  onSubmit,
  button_title,
  children
}) {

  return (
    <>
    <div className="sign__container">
      <form className={`sign__form sign__form-${name}`} name={name} action="#" method="POST" onSubmit={onSubmit}>
        <h4 className="sign__header">{title}</h4>
        {children}
        <button className="sign__button-submit" type="submit">{button_title}</button>
      </form>
      { 
        name === 'register'
        && <Link to="/sign-in" className="sign__link-sign-in">
        Уже зарегистрированы? Войти
      </Link>
      }
    </div>
    </>
  );

}

export default SignForm;
