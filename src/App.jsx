import { useState } from "react";
import { languages } from "./languages";
import "./App.css";

function App() {
  const languageElements = () => {
    return languages.map((language) => {
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
        <section className="game-status-wrapper">
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
        </section>
        <section className="language-pills-wrapper">
          {languageElements()}
        </section>
      </main>
    </>
  );
}

export default App;
