const words = ['programming', 'hangman', 'software', 'react', 'game'];
export const getRandomWord = () => {
  const randIndex = Math.floor(Math.random() * words.length);
  return words[randIndex];
};