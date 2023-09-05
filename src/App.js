import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';

import './App.css';
import logo from '../src/Logo.jpeg';

function App() {
  const [data, setData] = useState({
    Marke: '',
    Grösse: '',
    Anzahl: '',
    Material: '',
    Farbe: '',
    Schäden: '',
    Hinweise: '',
    Zustand: '',
    'Bei Nichtverkauf': '',
    'Startpreis': '',
    '1. Reaktivierung': '', // 1. Reaktivierung als leeres Feld
  });

  const [selectedOption, setSelectedOption] = useState('');
  const [copiedLabel, setCopiedLabel] = useState(null);

  const handleInputChange = (label, value) => {
    // Überprüfe, ob der eingegebene Wert nur Zahlen und "." enthält, und aktualisiere das Datenobjekt entsprechend.
    if (/^[0-9.]*$/.test(value) || label !== 'Startpreis') {
      setData((prevData) => ({
        ...prevData,
        [label]: value,
      }));
    }
  };

  const handleReaktivierungChange = (label, value) => {
    // Überprüfe, ob der eingegebene Wert nur Zahlen und "." enthält, und aktualisiere das Datenobjekt entsprechend.
    if (/^[0-9.]*$/.test(value) || label !== '1. Reaktivierung') {
      setData((prevData) => ({
        ...prevData,
        [label]: value,
      }));
    }
  };

  const handleCopy = (label) => {
    let text = `${label}: ${data[label]}`;

    // Wenn der Kopieren-Button für 'Startpreis' oder '1. Reaktivierung' geklickt wird, füge 'CHF ' vor der Zahl hinzu
    if (label === 'Startpreis' || label === '1. Reaktivierung') {
      text = `CHF ${data[label]}`;
    }

    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);

      setCopiedLabel(label);
      setTimeout(() => setCopiedLabel(null), 1000);
    } catch (error) {
      console.error('Kopieren fehlgeschlagen:', error);
    }
  };

  const handleCopyBeiNichtverkauf = () => {
    const text = `${selectedOption}`;

    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);

      setCopiedLabel('Bei Nichtverkauf');
      setTimeout(() => setCopiedLabel(null), 1000);
    } catch (error) {
      console.error('Kopieren fehlgeschlagen:', error);
    }
  };

  const handleClearAll = () => {
    setData({
      Marke: '',
      Grösse: '',
      Anzahl: '',
      Material: '',
      Farbe: '',
      Schäden: '',
      Hinweise: '',
      Zustand: '',
      'Bei Nichtverkauf': '',
      'Startpreis': '',
      '1. Reaktivierung': '',
    });
  };

  return (
    <div className="App">
      <div className='navbar'>
        <div className='logo-container'>
          <div className='center-button'>
            <button
              onClick={handleClearAll}
              style={{
                backgroundColor: 'red',
                color: 'white',
              }}
            >
              <span className="trash-icon">
                <FontAwesomeIcon icon={faTrash} />
              </span>
            </button>
          </div>
          <div className='version-label'>V.1.3</div>
          <img src={logo} alt="Restwert" />
        </div>
      </div>

      <div className="input-container">
        {Object.entries(data).map(([label, value]) => (
          <div key={label} className="input-field">
            <label style={{ fontSize: '18px', marginRight: '10px' }}>{label}:</label>
            {label === 'Bei Nichtverkauf' ? (
              <div>
                <select
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  style={{
                    width: '400px',
                    fontSize: '20px',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    outline: 'none',
                  }}
                >
                  <option value="">Auswählen</option>
                  <option value="Spenden">Spenden</option>
                  <option value="Rücknahme">Rücknahme</option>
                </select>
                <button
                  onClick={handleCopyBeiNichtverkauf}
                  style={{
                    backgroundColor: copiedLabel === 'Bei Nichtverkauf' ? 'limegreen' : '',
                  }}
                >
                  {copiedLabel === 'Bei Nichtverkauf' ? (
                    <FontAwesomeIcon icon={faCheck} />
                  ) : (
                    <FontAwesomeIcon icon={faCopy} />
                  )}
                </button>
              </div>
            ) : (
              <>
                <input
                  type={(label === 'Startpreis' || label === '1. Reaktivierung') ? 'text' : 'text'}
                  value={value}
                  onChange={(e) => (label === 'Startpreis' ? handleInputChange(label, e.target.value) : handleReaktivierungChange(label, e.target.value))}
                />
                <button
                  onClick={() => handleCopy(label)}
                  style={{
                    backgroundColor: copiedLabel === label ? 'limegreen' : '',
                  }}
                >
                  {copiedLabel === label ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faCopy} />}
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
