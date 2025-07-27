import { useState } from "react";
import { languages } from "./languages";
import "./App.css";

function App() {
  const [currentWord, setCurrentWord] = useState("react");

  const alphabets = "abcdefghijklmnopqrstuvwxyz";

  const languageElements = languages.map((language) => {
    return (
      <span
        key={language.name}
        className="language-pill"
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
    return (
      <span key={index} className="letter">
        {letter.toUpperCase()}
      </span>
    );
  });

  const keyboardButtonElements = alphabets.split("").map((letter, index) => {
    return (
      <button key={index} className="keyboard-button">
        {letter.toUpperCase()}
      </button>
    );
  });

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
        <section className="game-status-wrapper">
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
        </section>
        <section className="language-pills-wrapper">{languageElements}</section>
        <section className="current-word-wrapper">
          {currentwordElements}
        </section>
        <section className="keyboard-wrapper">{keyboardButtonElements}</section>
        <button className="new-game">New Game</button>
      </main>
    </>
  );
}

export default App;
