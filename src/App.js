import "./App.css";
import React, { useState } from "react";

function App() {
  const [length, setLength] = useState(10);
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [useDuplicates, setUseDuplicates] = useState(false);

  function handleChange(event) {
    setLength(event.target.value);
  }

  function generatePassword() {
    const length = parseInt(document.getElementById("length").value);
    const useUppercase = document.getElementById("uppercase").checked;
    const useLowercase = document.getElementById("lowercase").checked;
    const useNumbers = document.getElementById("numbers").checked;
    const useSymbols = document.getElementById("symbols").checked;
    const useDuplicates = document.getElementById("duplicates").checked;

    let charset = "";
    if (useUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (useNumbers) charset += "0123456789";
    if (useSymbols) charset += "!#$%&*@^?~";
    let password = "";
    let usedCharacters = ""; // Track used characters to check for duplicates

    for (let i = 0; i < length; i++) {
      let selectedChar = charset.charAt(
        Math.floor(Math.random() * charset.length),
      );

      if (useDuplicates) {
        while (usedCharacters.includes(selectedChar)) {
          // Keep generating until a non-duplicate character is found
          selectedChar = charset.charAt(
            Math.floor(Math.random() * charset.length),
          );
        }
        usedCharacters += selectedChar; // Add the selected character to usedCharacters
      }
      password += selectedChar;
    }
    setPassword(password);
  }

  function copyPassword() {
    const passwordElement = document.getElementById("password");
    const range = document.createRange();
    range.selectNode(passwordElement);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    try {
      document.execCommand("copy");
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 1000);
    } catch (err) {
      console.error("Unable to copy to clipboard");
    } finally {
      selection.removeAllRanges();
    }
  }

  return (
    <div className="container">
      <h3>Password Generator</h3>
      <div className="password-field">
        <span id="password">{password}</span>
        <button
          className="passwrd_button"
          id="clipboard"
          title="Copy"
          onClick={copyPassword}
        >
          <i class="fa-regular fa-paste"></i>
        </button>
      </div>
      <div className={`modal ${showModal ? "show" : ""}`}>
        <div className="modal-content">Password copied !</div>
      </div>

      <div className="options">
        <div className="currentLength">
          <label>Password Length</label>
          <input
            class="number"
            type="number"
            id="length"
            min="4"
            max="30"
            value={length}
            onChange={handleChange}
          />
        </div>
        <div className="option">
          <label>Exclude Duplicates</label>
          <input
            class="checkbox"
            type="checkbox"
            id="duplicates"
            checked={useDuplicates}
            onChange={(e) => setUseDuplicates(e.target.checked)}
          />
        </div>
        <div className="option">
          <label>Include UpperCase (A-Z)</label>
          <input
            class="checkbox"
            type="checkbox"
            id="uppercase"
            checked={useUppercase}
            onChange={(e) => setUseUppercase(e.target.checked)}
          />
        </div>
        <div className="option">
          <label>Include LowerCase (a-z)</label>
          <input
            class="checkbox"
            type="checkbox"
            id="lowercase"
            checked={useLowercase}
            onChange={(e) => setUseLowercase(e.target.checked)}
          />
        </div>
        <div className="option">
          <label>Include Numbers (0-9)</label>
          <input
            class="checkbox"
            type="checkbox"
            id="numbers"
            checked={useNumbers}
            onChange={(e) => setUseNumbers(e.target.checked)}
          />
        </div>
        <div className="option">
          <label>Include Symbols (@#$%&*)</label>
          <input
            class="checkbox"
            type="checkbox"
            id="symbols"
            checked={useSymbols}
            onChange={(e) => setUseSymbols(e.target.checked)}
          />
        </div>
      </div>
      <button
        className="passwrd_button"
        id="generate"
        onClick={generatePassword}
      >
        Generate Password
      </button>
    </div>
  );
}

export default App;
