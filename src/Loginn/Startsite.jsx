import React, { useState, useEffect } from 'react';
import './Startsite.scss';

function Startsite() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [loginAttempted, setLoginAttempted] = useState(false);
  const [loginSuccessful, setLoginSuccessful] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const checkLogin = () => {
    try {
      // Nur den Benutzer mit dem Benutzernamen "123" und dem Passwort "123" zulassen
      if (username === '123' && password === '123') {
        // Setze den Login-Erfolg
        setLoginSuccessful(true);
      } else {
        setErrorMessage('Falscher Benutzername oder Passwort');
        setLoginAttempted(true);
      }
    } catch (error) {
      console.error('Error checking login:', error);
      setErrorMessage('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
      setLoginAttempted(true);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    checkLogin();
  };

  const handleInputChange = () => {
    setErrorMessage('');
  };

  useEffect(() => {
    setTimeout(() => {
      setShowLoginForm(true);
    }, 2000);
  }, []);

  useEffect(() => {
    // Zurücksetzen des Login-Versuch-Status, wenn loginAttempted sich ändert
    if (loginAttempted) {
      setLoginAttempted(false);
    }
  }, [loginAttempted]);

  useEffect(() => {
    if (loginSuccessful) {
      window.location = '/mainsite';
      console.log('Login erfolgreich! Weiterleitung zur Hauptseite...');
    }
  }, [loginSuccessful]);

  return (
    <div className='login'>
      <div className={`Circle ${showLoginForm ? 'visible' : ''} ${loginSuccessful ? 'login-successful' : ''}`}>
        {showLoginForm && (
          <form className='LoginForm' onSubmit={handleLogin}>
            <h1>Login</h1>
            <input
              type='text'
              placeholder='Benutzername'
              disabled={loginAttempted}
              onChange={(e) => setUsername(e.target.value)}
              onFocus={handleInputChange}
            />
            <input
              type='password'
              placeholder='Passwort'
              disabled={loginAttempted}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={handleInputChange}
            />
            <div className='error-message'>{errorMessage}</div>
            <button type='submit' disabled={loginAttempted}>
              Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Startsite;
