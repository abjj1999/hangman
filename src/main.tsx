import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Game from './Game';
import './style.css';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  };

  return (
    <div>
      <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
      <Game />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));