import { useState } from "react";
import { languages } from "./languages";
import { getFarewellText } from "./utils";
import clsx from "clsx";
import "./App.css";

function App() {
  // State Variables
  const [currentWord, setCurrentWord] = useState("react");
  const [guessedLetters, setGuessedLetters] = useState([]);

  // Derived Variables
  const wrongGuessCount = guessedLetters.reduce((accumulator, letter) => {
    if (currentWord.includes(letter)) {
      return accumulator + 0;
    }
    return accumulator + 1;
  }, 0);
  // const isGameWon = currentWord.split('').every(letter => guessedLetters.includes(letter)); //another way to determin if the game is won
  const isGameWon =
    currentWord.length == guessedLetters.length - wrongGuessCount;
  const isGameLost = wrongGuessCount >= languages.length - 1;
  const isGameOver = isGameWon || isGameLost ? true : false;
  const isLastGuesssedIncorrect =
    !isGameOver && guessedLetters.length > 0 && wrongGuessCount > 0;
  // console.log("isGameOver: ", isGameOver);

  // Static variables
  const alphabets = "abcdefghijklmnopqrstuvwxyz";

  const languageElements = languages.map((language, index) => {
    return (
      <span
        key={language.name}
        className={clsx({
          "language-pill": true,
          lost: index < wrongGuessCount,
        })}
        style={{
          backgroundColor: language.backgroundColor,
          color: language.color,
        }}
      >
        {language.name}
      </span>
    );
  });

  const currentwordElements = currentWord.split("").map((letter, index) => {
    const isGuessed = guessedLetters.includes(letter.toLowerCase());
    return (
      <span key={index} className="letter">
        {isGuessed ? letter.toUpperCase() : ""}
      </span>
    );
  });

  const keyboardButtonElements = alphabets.split("").map((letter, index) => {
    const isGuessed = guessedLetters.includes(letter.toLowerCase());
    const isCorrect = isGuessed && currentWord.includes(letter.toLowerCase());
    const isWrong = isGuessed && !currentWord.includes(letter.toLowerCase());
    const className = clsx({
      "keyboard-button": true,
      "is-correct": isCorrect,
      "is-wrong": isWrong,
    });
    return (
      <button
        disabled={isGameOver ? true : false}
        key={index}
        className={className}
        onClick={() => addGuessedLetter(letter.toLowerCase())}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  function addGuessedLetter(letter) {
    setGuessedLetters((prevLetters) => {
      return !prevLetters.includes(letter)
        ? [...prevLetters, letter]
        : prevLetters;
    });
  }

  const getGameStatusElement = () => {
    const className = clsx(
      "game-status-wrapper",
      isGameWon && "status-won",
      isGameLost && "status-lost",
      isLastGuesssedIncorrect && "status-farewell"
    );
    return (
      <section className={className}>
        {isLastGuesssedIncorrect ? (
          <>
            <h2>"{getFarewellText(languages[wrongGuessCount - 1].name)}"</h2>
          </>
        ) : null}
        {isGameWon && (
          <>
            <h2>You win!</h2>
            <p>Well done! 🎉</p>
          </>
        )}
        {isGameLost && (
          <>
            <h2>Game over!</h2>
            <p>You lose! Better start learning Assembly 😭</p>
          </>
        )}
      </section>
    );
  };

  return (
    <>
      <main>
        <header>
          <h1>Assembly: Endgame</h1>
          <p>
            Guess the word in under 8 attempts to keep the programming world
            safe from Assembly!
          </p>
        </header>
        {getGameStatusElement()}
        <section className="language-pills-wrapper">{languageElements}</section>
        <section className="current-word-wrapper">
          {currentwordElements}
        </section>
        <section className="keyboard-wrapper">{keyboardButtonElements}</section>
        {isGameOver && <button className="new-game">New Game</button>}
      </main>
    </>
  );
}

export default App;
