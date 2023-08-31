import React, { useState, useEffect } from 'react';
import { getRandomWord } from './WordList';

const MAX_WRONG_GUESSES = 6;

const HANGMAN_PICS = [
  '____\n|   |\n|   \n|   \n|   \n|   ',
  '____\n|   |\n|   O\n|   \n|   \n|   ',
  '____\n|   |\n|   O\n|   |\n|   \n|   ',
  '____\n|   |\n|   O\n|  /|\n|   \n|   ',
  '____\n|   |\n|   O\n|  /|\\\n|   \n|   ',
  '____\n|   |\n|   O\n|  /|\\\n|  /\n|   ',
  '____\n|   |\n|   O\n|  /|\\\n|  / \\\n|   ',
];

const Game: React.FC = () => {
  const [word, setWord] = useState(getRandomWord());
  const [guesses, setGuesses] = useState<string[]>([]);
  const [wrongGuessCount, setWrongGuessCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleGuess = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (gameOver) return;
  
    const newInputValue = e.target.value;
    const newLetter = newInputValue[newInputValue.length - 1];
  
    if (!newLetter) return;
  
    setInputValue(''); // Reset the input field here
    setGuesses((prev) => [...prev, newLetter]);
  
    if (!word.split('').includes(newLetter)) {
      setWrongGuessCount((prev) => prev + 1);
    }
  };

  const resetGame = () => {
    setWord(getRandomWord());
    setGuesses([]);
    setWrongGuessCount(0);
    setGameOver(false);
    setInputValue('');
  };

  useEffect(() => {
    const wordArr = word.split('');
    if (wrongGuessCount >= MAX_WRONG_GUESSES) {
      setGameOver(true);
    } else if (wordArr.every((letter) => guesses.includes(letter))) {
      setGameOver(true);
    }
  }, [guesses, wrongGuessCount, word]);

  const display = word.split('').map((letter) => (guesses.includes(letter) ? letter : '_ '));

  return (
    <div className="game" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '24px' }}>
      <h1 style={{ fontSize: '48px' }}>Hangman Game</h1>
      <pre style={{ fontSize: '32px' }}>{HANGMAN_PICS[wrongGuessCount]}</pre>
      <p style={{ fontSize: '36px' }}>{display}</p>
      <p style={{ fontSize: '24px' }}>
        {gameOver &&
          (wrongGuessCount >= MAX_WRONG_GUESSES
            ? `Game Over! The word was "${word}".`
            : 'Congratulations! You won.')}
      </p>
      <input type="text" value={inputValue} onChange={handleGuess} style={{ fontSize: '24px', padding: '10px' }} disabled={gameOver} />
      <button onClick={resetGame} style={{ fontSize: '24px', padding: '10px' }}>Reset Game</button>
    </div>
  );
};

export default Game;