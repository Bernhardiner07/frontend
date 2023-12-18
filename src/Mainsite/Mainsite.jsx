import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './Mainsite.scss';

function Mainsite() {
  const [updates, setUpdates] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState({});
  const location = useLocation();

  useEffect(() => {
    // Mock data for demonstration purposes
    const mockUpdates = [
      { id: 1, version: "V.4.3", datum: "28.11.2023", title: 'Home Seite Neues Design', text: 'Die Home Seite hat ein neues Design bekommen.' },
      { id: 2, version: "V.4.4", datum: "29.11.2023", title: 'Login Fertig gestellt', text: 'Das Login wurde fertiggestellt und jeder Benutzer muss sich einloggen.' },
      { id: 3, version: "V.4.5", datum: "04.12.2023", title: 'Loginupdate fertig', text: 'Das Login hat jetzt alle Funktionen. Man kann sich einmal einloggen und dann ist man permanent eingeloggt.' },
      // Add more updates as needed
    ];

    // Sort updates by date in descending order
    const sortedUpdates = mockUpdates.sort((a, b) => new Date(parseDate(b.datum)) - new Date(parseDate(a.datum)));

    setUpdates(sortedUpdates);
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const storedUsername = searchParams.get('username');
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (storedUsername && storedUser) {
      setLoggedInUser(storedUser);
    }
  }, [location.search]);

  // Function to parse date in DD.MM.YYYY format and return as YYYY-MM-DD
  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('.');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="container">
      <div className="welcome-container">
      <h2 className="hello-message">Willkommen, Benutzer!</h2>

        {/* Neuer Code: Muster-Text oder Lückenfüller-Text */}
        <p className="muster-text">Herzlich willkommen auf Effizienzo! Schön, dass du dich entschieden hast, meine Plattform zu benutzen. Viel Spaß und bei Fragen komm einfach auf mich zu!</p>
        <p className='muster-text'>Liebe Grüße, Timo Blumer</p>
      </div>

      <div className='updates-container'>
        <h3>Updates</h3>
        <div className='updates'>
          {updates.map((update, index) => (
            <React.Fragment key={update.id}>
              <div className="Update">
                <p><strong>{update.version}</strong></p>
                <p><em>{update.datum}</em></p>
                <p><strong>{update.title}</strong></p>
                <p>{update.text}</p>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

function Update({ datum, title, text }) {
  return (
    <div className="update">
      <p><em>{datum}</em></p>
      <p><strong>{title}</strong></p>
      <p>{text}</p>
    </div>
  );
}

export default Mainsite;
