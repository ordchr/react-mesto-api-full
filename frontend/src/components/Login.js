import React, {useRef} from 'react';
import SignForm from './SignForm';

function Login({ onSignIn }) {

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    onSignIn({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
  }

  return (
    <>
    <SignForm 
      title="Вход" 
      name="login" 
      onSubmit={handleSubmit} 
      button_title="Войти" 
    >
      <input id="sign__input-email" className="sign__input"
        name="sign__input-email" type="email"
        placeholder="Email" required ref={emailRef}
      />
      <span id="sign__input-email-error" className="sign__input-error" />

      <input id="signup__input-password" className="sign__input"
        name="signup__input-password" type="password"
        placeholder="Password" required ref={passwordRef}
      />
      <span id="sign__input-password-error" className="sign__input-error" />
    </SignForm>
    </>
  );

}

export default Login;
